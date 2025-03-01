const express = require("express");
const SystemHealth = require("../models/SystemHealth");
const router = express.Router();

// Get system health
router.get("/", async (req, res) => {
  try {
    const health = await SystemHealth.findOne().sort({ lastUpdated: -1 });
    res.status(200).json(health);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch system health" });
  }
});

// Update system health
router.put("/", async (req, res) => {
  try {
    const updatedHealth = await SystemHealth.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json({ message: "System health updated successfully", health: updatedHealth });
  } catch (error) {
    res.status(500).json({ error: "Failed to update system health" });
  }
});

module.exports = router;