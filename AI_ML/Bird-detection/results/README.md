# Bird Detection using YOLO V8

## Overview
This project utilizes the YOLO V8 object detection model to identify birds in video footage. The system processes video frames in real-time, detects birds, highlights them with bounding boxes, and saves images when birds are detected.

## Features
- Real-time bird detection using YOLO V8
- Bounding boxes drawn around detected birds
- Saves detected bird images with timestamps
- Adjustable confidence threshold for detection
- Supports video input from an MP4 file
- Press 'q' to terminate the detection loop

## Requirements
Ensure you have the following dependencies installed before running the script:

```bash
pip install ultralytics opencv-python numpy
```

## Directory Structure
```
Bird Detection using YOLO V8/
│── model/
│   └── yolov8n.pt   # Pretrained YOLO V8 model
│── source/
│   └── birds.mp4    # Input video file
│── bird_detection.py  # Main script
```

## How to Use
1. Place the YOLO V8 model (`yolov8n.pt`) in the `model/` directory.
2. Store the video file (e.g., `birds.mp4`) in the `source/` directory.
3. Run the script using the following command:

```bash
python bird_detection.py
```

4. The program will process the video and detect birds in real-time.
5. Detected birds will be highlighted with green bounding boxes.
6. If a bird is detected, an image of the frame will be saved in the `images/` folder.
7. Press 'q' to stop the detection process.

## Code Explanation
- Loads a pretrained YOLO V8 model.
- Reads video frames and resizes them to `1280x720`.
- Runs the YOLO detection model on each frame with a confidence threshold of `0.6`.
- If a bird is detected, an image is saved with a timestamped filename.
- Draws bounding boxes and labels with confidence scores on the detected birds.
- Displays the detection in a window until 'q' is pressed to exit.

## Customization
- Modify `frame_width` and `frame_height` to adjust video resolution.
- Adjust `conf=0.6` in `model.predict()` to change detection confidence level.
- Change the input video path in `cap = cv2.VideoCapture("source/birds.mp4")`.

## Acknowledgments
This project is built using the [Ultralytics YOLO V8](https://github.com/ultralytics/ultralytics) model.

## License
This project is open-source and available for modification and distribution under the MIT License.

