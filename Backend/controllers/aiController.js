// controllers/aiController.js
const { sendToFlask } = require("../utils/flaskClient");
const Incident = require("../models/Incident");
const Alert = require("../models/Alert");

exports.detectThreat = async (req, res) => {
  try {
    const { imageData, location, lat, lng, camera } = req.body;

    // Send image data to Flask for processing
    const result = await sendToFlask(imageData);

    // Extract detection results
    const { threatType, confidence, boxedImageUrl } = result;

    // Save incident to the database
    const incident = new Incident({
      location,
      type: threatType,
      classification: "Unknown", // Default classification
      confidence,
      action: "Pending",
      lat,
      lng,
      imageUrl: boxedImageUrl,
    });
    await incident.save();

    // Create an alert if a threat is detected
    if (threatType !== "Unknown") {
      const alert = new Alert({
        message: `${threatType} detected at ${location}`,
        severity: getSeverity(threatType),
        camera,
      });
      await alert.save();
    }

    res.status(200).json({ message: "Threat detected successfully", incident, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function getSeverity(type) {
  switch (type) {
    case "UAV":
      return "High";
    case "Bird":
      return "Low";
    case "Aircraft":
      return "Medium";
    default:
      return "Low";
  }
}