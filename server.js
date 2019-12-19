const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

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
app.use("/api/answer", require("./routes/api/answer"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set statis folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
