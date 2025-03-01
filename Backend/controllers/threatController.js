const Threat = require("../models/Threat");

exports.getThreats = async (req, res) => {
    try {
        const threats = await Threat.find();
        res.json(threats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching threats" });
    }
};

exports.createThreat = async (req, res) => {
    try {
        const { type, confidence, location } = req.body;
        const newThreat = new Threat({ type, confidence, location });
        await newThreat.save();
        res.status(201).json(newThreat);
    } catch (error) {
        res.status(500).json({ message: "Error saving threat" });
    }
};