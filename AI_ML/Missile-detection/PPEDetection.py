from ultralytics import YOLO
import cv2
import cvzone
import math

# Initialize webcam (0 = default camera, change if using an external camera)
cap = cv2.VideoCapture(0)  
cap.set(3, 1280)  # Set width
cap.set(4, 720)   # Set height

# Load the trained model
model = YOLO("best.pt")

# Define object classes (including missile)
classNames = ['Barrel', 'Barrels', 'Fuse', 'GUN', 'Gun', 'Missile', 'Missilr', 'TAnk', 'Tank', 'Tanks', 'tank']
myColor = (0, 0, 255)  # Default color (red)

while True:
    success, img = cap.read()
    if not success:
        print("Camera not found or issue in capturing frame.")
        break

    # Perform object detection on the live frame
    results = model(img, stream=True)

    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Extract bounding box coordinates
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

            # Calculate width and height
            w, h = x2 - x1, y2 - y1

            # Confidence score
            conf = math.ceil((box.conf[0] * 100)) / 100

            # Get the detected class
            cls = int(box.cls[0])
            currentClass = classNames[cls]

            print(f"Detected: {currentClass} | Confidence: {conf}")

            # Change color based on detected object
            if currentClass in ['Barrel', 'Barrels', 'Fuse']:
                myColor = (0, 0, 255)  # Red
            elif currentClass in ['GUN', 'TAnk', 'Tank', 'Tanks']:
                myColor = (0, 255, 0)  # Green
            elif "Missile" in currentClass:  # If detected object is a missile
                myColor = (255, 0, 0)  # Blue
            else:
                myColor = (255, 255, 255)  # Default white

            # Draw bounding box
            cv2.rectangle(img, (x1, y1), (x2, y2), myColor, 3)

            # Display class name & confidence score
            cvzone.putTextRect(img, f'{currentClass} {conf}', 
                               (max(0, x1), max(35, y1)), scale=1, thickness=1,
                               colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)

    # Show the live detection feed
    cv2.imshow("Live Missile Detection", img)

    # Press 'q' to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
