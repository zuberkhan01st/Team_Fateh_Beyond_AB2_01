const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true, // Removes extra whitespace
  },
  time: {
    type: Date,
    default: Date.now, // Automatically sets the current timestamp
  },
  severity: {
    type: String,
    enum: ["Critical", "High", "Medium", "Low"], // Restricts values to these options
    required: true,
  },
  camera: {
    type: String,
    required: true,
    trim: true, // Removes extra whitespace
  },
  speed: {
    type: String,
    trim: true, // Optional but ensures clean data
  },
  altitude: {
    type: String,
    trim: true, // Optional but ensures clean data
  },
  heading: {
    type: String,
    trim: true, // Optional but ensures clean data
  },
  resolved: {
    type: Boolean,
    default: false, // Default value is false (not resolved)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation timestamp
    immutable: true, // Prevents modification after creation
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically sets the update timestamp
  },
});

// Middleware to update the `updatedAt` field before saving
alertSchema.pre("save", function (next) {
  this.updatedAt = Date.now(); // Update the timestamp on every save
  next();
});

module.exports = mongoose.model("Alert", alertSchema);