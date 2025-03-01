import cv2
import datetime
import os
from ultralytics import YOLO

model = YOLO("yolov8n.pt")  # Using the YOLOv8 Nano model

cap = cv2.VideoCapture(0)

frame_width = 1280
frame_height = 720
cap.set(3, frame_width)
cap.set(4, frame_height)

os.makedirs("images", exist_ok=True)

frame_count = 0  
if not cap.isOpened():
    print("Error: Cannot open webcam")
    exit()

while True:
    ret, frame = cap.read()

    if not ret:
        print("Error: No video frame available")
        break

    frame = cv2.resize(frame, (frame_width, frame_height))

    results = model.predict(source=[frame], conf=0.3, save=False) 
    for result in results:
        for box in result.boxes:
            bb = box.xyxy.numpy()[0]  # Bounding box
            conf = box.conf.numpy()[0]  # Confidence score
            class_id = int(box.cls.numpy()[0])  # Class ID
            class_name = model.names[class_id]  # Get class name

            # Debugging: Print detected objects
            print(f"Detected: {class_name} | Confidence: {conf:.2f}")

            # If detected object is a bird
            if "bird" in class_name.lower():
                # Save frame if a bird is detected
                if frame_count == 0:
                    current_time = datetime.datetime.now()
                    filename = os.path.join("images", current_time.strftime("bird_%Y-%m-%d_%H-%M-%S-%f.jpg"))
                    cv2.imwrite(filename, frame)

                frame_count = (frame_count + 1) % 10  # Reset counter every 10 frames

                # Draw green bounding box
                cv2.rectangle(
                    frame,
                    (int(bb[0]), int(bb[1])),
                    (int(bb[2]), int(bb[3])),
                    (0, 255, 0),
                    3,
                )

                # Display label
                font = cv2.FONT_HERSHEY_SIMPLEX
                cv2.putText(
                    frame,
                    f"{class_name} {conf:.2f}",
                    (int(bb[0]), int(bb[1]) - 10),
                    font,
                    1,
                    (255, 255, 255),
                    2,
                )

    # Show the frame
    cv2.imshow("Live Bird Detection", frame)

    # Quit when 'Q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
