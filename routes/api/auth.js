const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
// Middleware
const auth = require("../../middleware/auth");
// Model
const User = require("../../models/User");

/**
 * @route  api/auth/
 * @type   GET
 * @desc   Get auth user / Load user
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route  api/auth/
 * @type   POST
 * @desc   Login/Authenticate
 */
router.post(
  "/",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "The password field is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });

      // Check the password
      let isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });

      // Payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // JWT
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: "1d"
        },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
