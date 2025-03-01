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

app.get('/', (req,res)=>{
    return res.status(200).json({message: "Server's Working Fine!"});
})

app.use("/api/threats", require("./routes/threatRoutes"));

module.exports = app;
