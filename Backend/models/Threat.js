const mongoose = require("mongoose");

const ThreatSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Bird, Drone, Missile
    confidence: { type: Number, required: true },
    detectedAt: { type: Date, default: Date.now },
    location: { type: String }
});

module.exports = mongoose.model("Threat", ThreatSchema);