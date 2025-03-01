const mongoose = require("mongoose");

const threatClassificationSchema = new mongoose.Schema({
  type: { type: String, enum: ["UAV", "Birds", "Aircraft", "Unknown"], required: true },
  count: { type: Number, default: 0 },
  color: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ThreatClassification", threatClassificationSchema);