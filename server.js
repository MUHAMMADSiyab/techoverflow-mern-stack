const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Allow JSON content-type
app.use(express.json({ extended: false }));

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/question", require("./routes/api/question"));

PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
