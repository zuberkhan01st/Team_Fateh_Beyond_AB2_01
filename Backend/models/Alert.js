const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
  severity: { type: String, enum: ["Critical", "High", "Medium", "Low"], required: true },
  camera: { type: String, required: true },
  speed: { type: String },
  altitude: { type: String },
  heading: { type: String },
  resolved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Alert", alertSchema);