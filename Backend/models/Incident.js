const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  location: { type: String, required: true },
  type: { type: String, enum: ["UAV", "Birds", "Aircraft", "Unknown"], required: true },
  classification: { type: String, enum: ["Military", "Commercial", "Civilian", "Unknown"] },
  confidence: { type: Number, min: 0, max: 100, required: true },
  action: { type: String, enum: ["Tracked", "Reported", "Neutralized", "Pending"] },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  imageUrl: {type: String},
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation timestamp
    immutable: true, // Prevents modification after creation
  },
});

module.exports = mongoose.model("Incident", incidentSchema);