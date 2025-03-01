const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/threats", require("./routes/threatRoutes"));

module.exports = app;
