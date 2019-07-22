const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect DB
connectDB();

PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
