const mongoose = require("mongoose");

const systemHealthSchema = new mongoose.Schema({
  status: { type: String, enum: ["Operational", "Degraded", "Down"], default: "Operational" },
  responseTime: { type: String, default: "1.8s" },
  weatherConditions: { type: String, enum: ["Clear", "Rainy", "Windy", "Stormy"], default: "Clear" },
  visibilityStatus: { type: String, enum: ["Excellent", "Good", "Poor"], default: "Excellent" },
  activeZones: [{ type: String }],
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SystemHealth", systemHealthSchema);