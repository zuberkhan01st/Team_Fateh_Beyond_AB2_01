const mongoose = require('mongoose');

const ThreatSchema = new mongoose.Schema({
    type: { type: String, enum: ['UAV', 'Aircraft', 'Birds', 'Unknown'] },
    location: String,
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'] },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Threat', ThreatSchema);
