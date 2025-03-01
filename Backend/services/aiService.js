const axios = require("axios");

exports.detectThreat = async (image) => {
    try {
        const response = await axios.post("http://localhost:5001/detect", { image });
        return response.data;
    } catch (error) {
        console.error("AI Detection Failed", error);
        return { error: "AI service unavailable" };
    }
};