const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check if there is a token
  if (!token) return res.status(401).json({ msg: "Not authorized" });

  // Validate the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Auth token is invalid or expired" });
  }
};
