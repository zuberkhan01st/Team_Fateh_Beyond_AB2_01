from ultralytics import YOLO

if __name__ == "__main__":
    model = YOLO("yolov8m.pt").to("cuda")  

    model.train(
        data="D:/AB2_PS01/data.yaml",
        epochs=25,
        imgsz=512,            # Reduce image size
        batch=16,             # Increase batch size (reduce if OOM)
        device="cuda",
        save=True,
        save_period=5,
        project="D:/AB2_PS01/runs/detect",
        name="train_fast",
        exist_ok=True,
        amp=True,             # Mixed precision
        workers=4,            # Reduce workers          # Cache dataset
        optimizer="AdamW",    # Use AdamW optimizer
        val=False             # Skip validation during training
    )

    results = model.val(weights="D:/AB2_PS01/runs/train_fast/weights/best.pt")
    print(results)
    print()
    print("Training complete. Model saved at:", model.ckpt_path)

