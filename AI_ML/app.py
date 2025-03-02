from fastapi import FastAPI, UploadFile, File, WebSocket, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import torch
import json
import base64
from io import BytesIO
import math
import time
import asyncio
from typing import Dict, List, Optional, Tuple
import logging
from enum import Enum
from pydantic import BaseModel
from ultralytics import YOLO
from norfair import Tracker, Detection
from filterpy.kalman import KalmanFilter
import uvicorn


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("airborne-threat-detection")

app = FastAPI(
    title="Airborne Threat Detection API",
    description="API for detecting, tracking, and assessing airborne threats using YOLOv8 and DeepSORT",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models and Data Classes
class ThreatLevel(str, Enum):
    LOW = "Low"
    HIGH = "High"
    CRITICAL = "Critical"

class ObjectType(str, Enum):
    AIRPLANE = "Airplane"
    DRONE = "Drone"
    HELICOPTER = "Helicopter"
    UNKNOWN = "Unknown"

class DetectedObject(BaseModel):
    id: int
    object_type: ObjectType
    confidence: float
    bbox: List[int]
    predicted_position: List[int]
    speed: float
    direction: float
    threat_level: ThreatLevel

class DetectionResponse(BaseModel):
    frame_id: int
    timestamp: float
    objects: List[DetectedObject]

# Global variables
model = None
tracker = None
object_trajectories = {}
object_history = {}  # Store historical positions
frame_counter = 0

# Constants for threat assessment
SPEED_THRESHOLD_HIGH = 40
SPEED_THRESHOLD_CRITICAL = 80
APPROACH_ANGLE_THRESHOLD = 30  # Degrees

# Class names mapping (adjust based on your model's classes)
class_names = {
    0: ObjectType.AIRPLANE,
    1: ObjectType.DRONE,
    2: ObjectType.HELICOPTER,
    # Add more class mappings as needed
}

# Load model on startup
@app.on_event("startup")
async def startup_event():
    global model, tracker
    try:
        # Load YOLOv8 model with the specified path
        model = YOLO(r"D:\AB2_PS01\runs\detect\train_fast\weights\best.pt")
        logger.info("YOLOv8 model loaded successfully")
        
        # Initialize object tracker (using DeepSORT principles)
        tracker = Tracker(
            distance_function="euclidean", 
            distance_threshold=50,
            initialization_delay=3
        )
        logger.info("Object tracker initialized")
    except Exception as e:
        logger.error(f"Failed to load model or initialize tracker: {e}")
        raise

# Kalman Filter Initialization
def create_kalman_filter():
    kf = KalmanFilter(dim_x=4, dim_z=2)
    kf.F = np.array([
        [1, 0, 1, 0], 
        [0, 1, 0, 1], 
        [0, 0, 1, 0], 
        [0, 0, 0, 1]
    ])  # State transition matrix
    kf.H = np.array([
        [1, 0, 0, 0], 
        [0, 1, 0, 0]
    ])  # Measurement function
    kf.P *= 1000  # Covariance matrix
    kf.R = np.array([
        [5, 0], 
        [0, 5]
    ])  # Measurement noise
    kf.Q = np.eye(4) * 0.1  # Process noise
    return kf

# Threat Level Assessment
def assess_threat(object_type: ObjectType, speed: float, direction: float, 
                  position: List[float], frame_shape: Tuple[int, int]) -> ThreatLevel:
    """
    Assess threat level based on object type, speed, direction and position
    
    Args:
        object_type: Type of object (Airplane, Drone, Helicopter)
        speed: Estimated speed of object
        direction: Direction of movement in degrees
        position: Current [x, y] position
        frame_shape: Frame dimensions [height, width]
    
    Returns:
        Threat level enum
    """
    # Base threat level on object type - updated for the new object types
    if object_type == ObjectType.AIRPLANE:
        base_threat = ThreatLevel.HIGH
    elif object_type == ObjectType.DRONE:
        base_threat = ThreatLevel.HIGH
    elif object_type == ObjectType.HELICOPTER:
        base_threat = ThreatLevel.CRITICAL if speed > SPEED_THRESHOLD_HIGH else ThreatLevel.HIGH
    else:  # unknown objects
        base_threat = ThreatLevel.LOW
    
    # Calculate if object is approaching center (higher threat)
    frame_center = [frame_shape[1] // 2, frame_shape[0] // 2]
    vector_to_center = [frame_center[0] - position[0], frame_center[1] - position[1]]
    
    # Calculate angle between movement direction and center direction
    if speed > 0:
        movement_vector = [math.cos(math.radians(direction)), math.sin(math.radians(direction))]
        dot_product = movement_vector[0] * vector_to_center[0] + movement_vector[1] * vector_to_center[1]
        magnitude = math.sqrt(vector_to_center[0]*2 + vector_to_center[1]*2)
        
        if magnitude > 0:
            angle_to_center = math.acos(max(min(dot_product / magnitude, 1), -1))
            approaching_center = abs(angle_to_center) < math.radians(APPROACH_ANGLE_THRESHOLD)
        else:
            approaching_center = False
    else:
        approaching_center = False
    
    # Escalate threat level based on speed and approach angle
    if approaching_center:
        if speed > SPEED_THRESHOLD_CRITICAL:
            return ThreatLevel.CRITICAL
        elif speed > SPEED_THRESHOLD_HIGH and base_threat != ThreatLevel.CRITICAL:
            return ThreatLevel.HIGH
    
    return base_threat

# Predict trajectory
def predict_trajectory(kf: KalmanFilter, steps: int = 5) -> List[List[float]]:
    """
    Predict future positions based on Kalman filter state
    
    Args:
        kf: Kalman filter object
        steps: Number of future steps to predict
        
    Returns:
        List of predicted [x, y] positions
    """
    predictions = []
    current_state = kf.x.copy()
    
    for _ in range(steps):
        # Apply state transition matrix to predict next state
        next_state = np.dot(kf.F, current_state)
        predictions.append([float(next_state[0]), float(next_state[1])])
        current_state = next_state
        
    return predictions

@app.post("/analyze/", response_model=DetectionResponse)
async def analyze_frame(file: UploadFile = File(...)):
    """
    Process a single frame to detect, track, predict trajectories, and assess threats
    
    Args:
        file: Uploaded image file
        
    Returns:
        JSON response with detection and tracking information
    """
    global frame_counter
    frame_counter += 1
    
    try:
        # Read and decode the image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Process frame with YOLO model
        results = model(frame, verbose=False)
        
        # Extract detections
        detections = []
        detection_classes = []
        detection_confidences = []
        
        for result in results:
            boxes = result.boxes
            for i, box in enumerate(boxes):
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                confidence = box.conf.item()
                class_id = int(box.cls.item())
                
                # Store detection data for tracking
                detection = Detection(
                    points=np.array([[(x1 + x2) / 2, (y1 + y2) / 2]]),
                    scores=np.array([confidence]),
                    data={"bbox": [x1, y1, x2, y2], "class_id": class_id}
                )
                detections.append(detection)
                detection_classes.append(class_id)
                detection_confidences.append(confidence)
        
        # Update tracker with new detections
        tracked_objects = tracker.update(detections=detections)
        
        # Process tracked objects
        response_objects = []
        frame_height, frame_width = frame.shape[:2]
        
        for tracked_obj in tracked_objects:
            object_id = tracked_obj.id
            tracked_point = tracked_obj.estimate[0]  # [x, y]
            object_data = tracked_obj.last_detection.data
            
            x1, y1, x2, y2 = object_data["bbox"]
            class_id = object_data["class_id"]
            confidence = tracked_obj.last_detection.scores[0]
            
            # Get object type from class_id
            object_type = class_names.get(class_id, ObjectType.UNKNOWN)
            
            # Update Kalman filter for this object
            if object_id not in object_trajectories:
                object_trajectories[object_id] = create_kalman_filter()
                object_history[object_id] = []
            
            kf = object_trajectories[object_id]
            
            # Update history
            object_history[object_id].append((tracked_point, time.time()))
            if len(object_history[object_id]) > 30:  # Keep last 30 positions
                object_history[object_id].pop(0)
            
            # Update Kalman filter with new measurement
            kf.predict()
            kf.update(np.array([tracked_point]))
            
            # Calculate speed and direction
            if len(object_history[object_id]) >= 2:
                prev_pos, prev_time = object_history[object_id][-2]
                current_pos, current_time = object_history[object_id][-1]
                
                time_diff = current_time - prev_time
                if time_diff > 0:
                    # Pixels per second
                    dx = current_pos[0] - prev_pos[0]
                    dy = current_pos[1] - prev_pos[1]
                    distance = math.sqrt(dx*2 + dy*2)
                    speed = distance / time_diff  # pixels per second
                    
                    # Direction in degrees
                    direction = math.degrees(math.atan2(dy, dx))
                else:
                    speed = 0
                    direction = 0
            else:
                speed = 0
                direction = 0
            
            # Predict future position (next frame)
            predicted_position = kf.x[:2].flatten().tolist()
            
            # Get full trajectory prediction
            future_trajectory = predict_trajectory(kf, steps=10)
            
            # Assess threat level
            threat_level = assess_threat(
                object_type=object_type,
                speed=speed,
                direction=direction,
                position=tracked_point,
                frame_shape=(frame_height, frame_width)
            )
            
            # Create response object
            detected_obj = DetectedObject(
                id=object_id,
                object_type=object_type,
                confidence=float(confidence),
                bbox=[int(x1), int(y1), int(x2), int(y2)],
                predicted_position=[int(predicted_position[0]), int(predicted_position[1])],
                speed=round(speed, 2),
                direction=round(direction, 2),
                threat_level=threat_level
            )
            
            response_objects.append(detected_obj)
        
        # Create final response
        response = DetectionResponse(
            frame_id=frame_counter,
            timestamp=time.time(),
            objects=response_objects
        )
        
        return response
    
    except Exception as e:
        logger.error(f"Error processing frame: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing frame: {str(e)}")

@app.post("/analyze_video/")
async def analyze_video(file: UploadFile = File(...)):
    """
    Process a video file for airborne threat detection
    
    Args:
        file: Uploaded video file
    
    Returns:
        JSON response with detection and tracking summary
    """
    try:
        # Save uploaded video to a temporary file
        temp_file = f"temp_video_{int(time.time())}.mp4"
        with open(temp_file, "wb") as buffer:
            buffer.write(await file.read())
        
        # Process video
        cap = cv2.VideoCapture(temp_file)
        if not cap.isOpened():
            raise HTTPException(status_code=400, detail="Failed to open video file")
        
        # Initialize variables
        global tracker, object_trajectories, object_history, frame_counter
        tracker = Tracker(distance_function="euclidean", distance_threshold=50)
        object_trajectories = {}
        object_history = {}
        frame_counter = 0
        
        results = []
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            # Resize frame to 640x640
            frame = cv2.resize(frame, (640, 640), interpolation=cv2.INTER_AREA)

            frame_counter += 1
            if frame_counter % 3 != 0:  # Process every 3rd frame to improve speed
                continue
                
            # Convert frame to bytes for processing
            _, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = BytesIO(buffer).getvalue()
            
            # Create a simulated file upload
            file_like = BytesIO(frame_bytes)
            file_like.name = "frame.jpg"
            
            # Process the frame using our existing endpoint
            # We'll create a custom UploadFile since we can't directly use the one from FastAPI
            class MockUploadFile:
                def _init_(self, file_like):
                    self.file = file_like
                
                async def read(self):
                    return self.file.read()
            
            mock_file = MockUploadFile(file_like)
            result = await analyze_frame(mock_file)
            results.append(result)
            
        cap.release()
        
        # Clean up
        import os
        if os.path.exists(temp_file):
            os.remove(temp_file)
            
        # Return a summary of results
        total_frames = len(results)
        unique_objects = set()
        threat_counts = {
            ThreatLevel.LOW: 0,
            ThreatLevel.HIGH: 0,
            ThreatLevel.CRITICAL: 0
        }
        
        object_type_counts = {
            ObjectType.AIRPLANE: 0,
            ObjectType.DRONE: 0,
            ObjectType.HELICOPTER: 0,
            ObjectType.UNKNOWN: 0
        }
        
        for frame_result in results:
            for obj in frame_result.objects:
                unique_objects.add(obj.id)
                threat_counts[obj.threat_level] += 1
                object_type_counts[obj.object_type] += 1
                
        # Create summary response
        summary = {
            "total_frames_processed": total_frames,
            "unique_objects_detected": len(unique_objects),
            "threat_level_summary": {
                "low": threat_counts[ThreatLevel.LOW],
                "high": threat_counts[ThreatLevel.HIGH],
                "critical": threat_counts[ThreatLevel.CRITICAL]
            },
            "object_type_summary": {
                "airplanes": object_type_counts[ObjectType.AIRPLANE],
                "drones": object_type_counts[ObjectType.DRONE],
                "helicopters": object_type_counts[ObjectType.HELICOPTER],
                "unknown": object_type_counts[ObjectType.UNKNOWN]
            }
        }
        
        return JSONResponse(content=summary)
        
    except Exception as e:
        logger.error(f"Error processing video: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

# WebSocket endpoint for real-time video processing
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    # Reset tracking for new connection
    global tracker, object_trajectories, object_history, frame_counter
    tracker = Tracker(distance_function="euclidean", distance_threshold=50)
    object_trajectories = {}
    object_history = {}
    frame_counter = 0
    
    try:
        while True:
            # Receive frame as base64 string
            data = await websocket.receive_text()
            json_data = json.loads(data)
            
            if "frame" not in json_data:
                await websocket.send_json({"error": "No frame data received"})
                continue
                
            # Decode base64 image
            frame_data = base64.b64decode(json_data["frame"])
            nparr = np.frombuffer(frame_data, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if frame is None:
                await websocket.send_json({"error": "Invalid frame data"})
                continue
                
            # Process the frame using our analyze_frame logic
            # Convert frame to file-like object
            _, buffer = cv2.imencode('.jpg', frame)
            file_like = BytesIO(buffer.tobytes())
            file_like.name = "frame.jpg"
            
            class MockUploadFile:
                def _init_(self, file_like):
                    self.file = file_like
                
                async def read(self):
                    self.file.seek(0)
                    return self.file.read()
            
            mock_file = MockUploadFile(file_like)
            
            # Process frame
            result = await analyze_frame(mock_file)
            
            # Send results back to client
            await websocket.send_json(result.dict())
            
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
        await websocket.close()

# HTML page for testing the API
@app.get("/", response_class=HTMLResponse)
async def get_html():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Airborne Threat Detection</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #333; }
                .container { display: flex; gap: 20px; }
                .panel { flex: 1; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                #videoFeed { width: 100%; border: 1px solid #ccc; }
                .threat-low { background-color: green; color: white; padding: 2px 5px; border-radius: 3px; }
                .threat-high { background-color: orange; color: white; padding: 2px 5px; border-radius: 3px; }
                .threat-critical { background-color: red; color: white; padding: 2px 5px; border-radius: 3px; }
                #detections { height: 400px; overflow-y: auto; }
            </style>
        </head>
        <body>
            <h1>Airborne Threat Detection System</h1>
            <div class="container">
                <div class="panel">
                    <h2>Video Feed</h2>
                    <video id="videoFeed" autoplay></video>
                    <div>
                        <button id="startButton">Start Camera</button>
                        <button id="stopButton" disabled>Stop Camera</button>
                    </div>
                    <p>Status: <span id="status">Not connected</span></p>
                </div>
                <div class="panel">
                    <h2>Detections</h2>
                    <div id="detections"></div>
                </div>
            </div>
            
            <script>
                let video = document.getElementById('videoFeed');
                let startButton = document.getElementById('startButton');
                let stopButton = document.getElementById('stopButton');
                let status = document.getElementById('status');
                let detections = document.getElementById('detections');
                
                let stream;
                let websocket;
                let canvasContext;
                
                startButton.addEventListener('click', async () => {
                    try {
                        stream = await navigator.mediaDevices.getUserMedia({ video: true });
                        video.srcObject = stream;
                        startButton.disabled = true;
                        stopButton.disabled = false;
                        
                        // Create canvas for capturing frames
                        const canvas = document.createElement('canvas');
                        canvas.width = 640;
                        canvas.height = 480;
                        canvasContext = canvas.getContext('2d');
                        
                        // Connect to WebSocket
                        connectWebSocket();
                    } catch (err) {
                        console.error('Error accessing camera:', err);
                        status.textContent = 'Error accessing camera';
                    }
                });
                
                stopButton.addEventListener('click', () => {
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        video.srcObject = null;
                    }
                    
                    if (websocket) {
                        websocket.close();
                    }
                    
                    startButton.disabled = false;
                    stopButton.disabled = true;
                    status.textContent = 'Disconnected';
                });
                
                function connectWebSocket() {
                    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
                    websocket = new WebSocket(${wsProtocol}//${window.location.host}/ws);
                    
                    websocket.onopen = () => {
                        status.textContent = 'Connected';
                        // Start sending frames
                        sendFrames();
                    };
                    
                    websocket.onclose = () => {
                        status.textContent = 'Disconnected';
                    };
                    
                    websocket.onerror = (error) => {
                        console.error('WebSocket error:', error);
                        status.textContent = 'Connection error';
                    };
                    
                    websocket.onmessage = (event) => {
                        const data = JSON.parse(event.data);
                        displayDetections(data);
                    };
                }
                
                function sendFrames() {
                    if (!websocket || websocket.readyState !== WebSocket.OPEN) return;
                    
                    // Capture frame from video
                    canvasContext.drawImage(video, 0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
                    const frame = canvasContext.canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
                    
                    // Send frame to server
                    websocket.send(JSON.stringify({ frame }));
                    
                    // Schedule next frame
                    setTimeout(sendFrames, 100);  // 10 FPS
                }
                
                function displayDetections(data) {
                    if (!data.objects) return;
                    
                    let html = <p>Frame: ${data.frame_id}</p>;
                    
                    data.objects.forEach(obj => {
                        let threatClass = '';
                        if (obj.threat_level === 'Low') threatClass = 'threat-low';
                        else if (obj.threat_level === 'High') threatClass = 'threat-high';
                        else if (obj.threat_level === 'Critical') threatClass = 'threat-critical';
                        
                        html += `
                            <div>
                                <p>Object ID: ${obj.id} - Type: ${obj.object_type} - 
                                   <span class="${threatClass}">${obj.threat_level}</span></p>
                                <p>Speed: ${obj.speed} - Direction: ${obj.direction}°</p>
                            </div>
                            <hr>
                        `;
                    });
                    
                    detections.innerHTML = html;
                }
            </script>
        </body>
    </html>
    """

if _name_ == "_main_":
    uvicorn.run(app, host="0.0.0.0", port=8000)