const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require("nodemailer");
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
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route /api/auth/verify_email
 * @type  POST
 * @desc  Verify email
 */
router.post(
  "/verify_email",
  [auth, [check("email", "Please provide a valid email").isEmail()]],
  async (req, res) => {
    const { email } = req.body;

    // Validation
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Check if the email provided is the active user's email
    const user = await User.findById(req.user.id);

    if (user.email !== email)
      return res.status(401).json({ msg: "Please enter your account email" });

    // Generate token from user email
    jwt.sign(
      { email },
      config.get("jwtSecret"),
      {
        expiresIn: "1800000"
      },
      (err, emailToken) => {
        if (err) throw err;
        const verifyUrl = `http://localhost:3000/verify_email_token/token=${emailToken}`;
        sendMail(email, verifyUrl);
      }
    );

    // Send mail
    async function sendMail(email, verifyUrl) {
      try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "siyab.dev@gmail.com", // user email
            pass: "@@@PHPlover007" // user password
          }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Techoverflow 👻" <siyab.dev@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Email Verification - Techoverflow", // Subject line
          text: "", // plain text body
          html: `
            Visit the below link to verify your email address <br><br>
            <a href="${verifyUrl}">${verifyUrl}</a>`
        });

        res.send("Verification email has been sent to your account");

        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.error(error);
      }
    }
  }
);

/**
 * @route /api/auth/verify_email_token
 * @type  POST
 * @desc  Verify email token
 */
router.post("/verify_email_token", auth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.emailToken, config.get("jwtSecret"));

    const user = await User.findById(req.user.id).select("-password");

    if (user.email !== decoded.email)
      return res
        .status(401)
        .json({ msg: "Please provide your account's email" });

    // Verify email
    user.emailVerified = true;

    await user.save();

    res.json(user);
  } catch (err) {
    res
      .status(401)
      .json({ msg: "Email verification token is invalid or has been expired" });
  }
});

module.exports = router;
