const express = require("express");
const Incident = require("../models/Incident");
const router = express.Router();

// Create a new incident
router.post("/", async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({ message: "Incident created successfully", incidentId: incident._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create incident" });
  }
});

// Get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ timestamp: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch incidents" });
  }
});

// Delete an incident
router.delete("/:id", async (req, res) => {
  try {
    await Incident.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete incident" });
  }
});

module.exports = router;