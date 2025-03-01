// utils/flaskClient.js
const axios = require("axios");

const FLASK_URL = "http://localhost:5000/predict"; // Flask server endpoint

async function sendToFlask(imageData) {
  try {
    const response = await axios.post(FLASK_URL, { image: imageData }, { responseType: "json" });
    return response.data; // Response contains detection results
  } catch (error) {
    console.error("Error sending data to Flask:", error.message);
    throw new Error("Failed to process image with Flask");
  }
}

module.exports = { sendToFlask };