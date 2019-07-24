const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const config = require("config");
// Middleware
const auth = require("../../middleware/auth");

// Modals
const User = require("../../models/User");

/**
 * @route   /api/users/
 * @type    POST
 * @desc    Register a new user
 */
router.post(
  "/",
  [
    check("name", "The name field is required")
      .not()
      .isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "The password must be at least 6 characters in length"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Validation errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      // Check if the user with this email already exists
      let user = await User.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User with this email already exists" }] });

      // Get avatar
      let avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      // new User
      user = new User({
        name,
        email,
        password,
        avatar
      });

      // Hash the password
      let salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Payload
      let payload = {
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
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
