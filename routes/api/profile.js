const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Middleware
const auth = require("../../middleware/auth");
// Model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

/**
 * @route   /api/profile/
 * @type    POST
 * @desc    Create or update profile
 */
router.post(
  "/",
  [
    auth,
    [
      check("status", "The field status is required")
        .not()
        .isEmpty(),
      check("skills", "The field skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      company,
      status,
      bio,
      location,
      website,
      skills,
      linkedin,
      facebook,
      twitter
    } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;

    // Build profile object
    if (company) profileFields.company = company;
    if (status) profileFields.status = status;
    if (location) profileFields.location = location;
    if (skills)
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    if (website) profileFields.website = website;

    profileFields.social = {};

    // Build social object
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      // Update the profile if already created
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create new profile
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/profile
 * @type    GET
 * @desc    Get all profiles
 */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/profile/:user_id
 * @type    GET
 * @desc    Get profile by ID
 */
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(404).json({ msg: "No profile found for this user" });

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No profile found for this user" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/profile/experience
 * @type    POST
 * @desc    Add experience
 */
router.post(
  "/experience",
  [
    auth,
    [
      check("title", "The title field is required")
        .not()
        .isEmpty(),
      check("company", "The company field is required")
        .not()
        .isEmpty(),
      check("from", "The from field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const experience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      };

      profile.experience.unshift(experience);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/profile/experience/:exp_id
 * @type    PUT
 * @desc    Update the experience
 */
router.put(
  "/experience/:exp_id",
  [
    auth,
    [
      check("title", "The title field is required")
        .not()
        .isEmpty(),
      check("company", "The company field is required")
        .not()
        .isEmpty(),
      check("from", "The from field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    try {
      const experience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      };

      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id, "experience._id": req.params.exp_id },
        { $set: { experience } },
        { new: true }
      );

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/profile/experience/:exp_id
 * @type    DELETE
 * @desc    Delete the experience
 */
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the experience index
    const expIndex = profile.experience
      .map(exp => exp._id)
      .indexOf(req.params.exp_id);

    // Remove
    profile.experience.splice(expIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/profile/education
 * @type    POST
 * @desc    Add education
 */
router.post(
  "/education",
  [
    auth,
    [
      check("school", "The school field is required")
        .not()
        .isEmpty(),
      check("degree", "The degree field is required")
        .not()
        .isEmpty(),
      check("from", "The from field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const education = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };

      profile.education.unshift(education);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/profile/education/:edu_id
 * @type    PUT
 * @desc    Update the education
 */
router.put(
  "/education/:edu_id",
  [
    auth,
    [
      check("school", "The school field is required")
        .not()
        .isEmpty(),
      check("degree", "The degree field is required")
        .not()
        .isEmpty(),
      check("from", "The from field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    try {
      const education = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };

      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id, "education._id": req.params.edu_id },
        { $set: { education } },
        { new: true }
      );

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/profile/education/:edu_id
 * @type    DELETE
 * @desc    Delete the education
 */
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the education index
    const eduIndex = profile.education
      .map(exp => exp._id)
      .indexOf(req.params.edu_id);

    // Remove
    profile.education.splice(eduIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/profile/
 * @type    DELETE
 * @desc    Delete the entire account
 */
router.delete("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Delete profile
    await profile.remove();

    const user = await User.findById(req.user.id);

    // Delete user
    await user.remove();

    res.json({ msg: "Account deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
