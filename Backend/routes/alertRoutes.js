const express = require("express");
const Alert = require("../models/Alert");
const router = express.Router();

// Create a new alert
router.post("/", async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json({ message: "Alert created successfully", alertId: alert._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create alert" });
  }
});

// Get all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find({ resolved: false }).sort({ time: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// Clear an alert
router.delete("/:id", async (req, res) => {
  try {
    await Alert.findByIdAndUpdate(req.params.id, { resolved: true });
    res.status(200).json({ message: "Alert cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear alert" });
  }
});

module.exports = router;