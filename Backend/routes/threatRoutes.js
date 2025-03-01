const express = require("express");
const router = express.Router();
const { getThreats, createThreat } = require("../controllers/threatController");

router.get("/", getThreats);
router.post("/", createThreat);

module.exports = router;