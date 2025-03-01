const Threat = require('../models/Threat');
//const io = require('../utils/websocket');

exports.getThreats = async (req, res) => {
    try {
        const threats = await Threat.find().sort({ detectedAt: -1 });
        res.json(threats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new threat
exports.createThreat = async (req, res) => {
    const { type, location, severity } = req.body;
    try {
        const threat = new Threat({ type, location, severity });
        await threat.save();

        // Emit real-time threat notification
        io.getIO().emit('new_threat', threat);

        res.status(201).json(threat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.clearThreat = async (req, res) => {
    try {
        const {threatId} = req.qwery;

        const threat = await Threat.findById(threatId);
        if(!threat){
            return res.json({message: "Invalid ThreatID"});
        }
        await threat.deleteOne();
        res.json({ message: "All threats cleared" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
