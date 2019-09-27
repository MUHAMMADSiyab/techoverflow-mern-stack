const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Middleware
const auth = require("../../middleware/auth");
// Models
const User = require("../../models/User");
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");

/**
 * @route   /api/question
 * @type    POST
 * @desc    Post an answer
 */
router.post(
  "/:question_id",
  [
    auth,
    [
      check("body", "The body field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select("-password");

      let answerData = {
        question_id: req.params.question_id,
        body: req.body.body,
        name: user.name,
        avatar: user.avatar,
        user: user.id
      };

      let answer = new Answer(answerData);

      await answer.save();

      // Update the answer count in question
      const question = await Question.findById(req.params.question_id);

      question.answers = question.answers + 1;

      await question.save();

      res.json(answer);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId")
        return res.status(404).json({ msg: "No question found" });
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/answer/:answer_id
 * @type    PUT
 * @desc    Update an answer
 */
router.put(
  "/:answer_id",
  [
    auth,
    [
      check("body", "The body field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const answer = await Answer.findOneAndUpdate(
        { user: req.user.id, _id: req.params.answer_id },
        { $set: { body: req.body.body } },
        { new: true }
      );

      res.json(answer);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId")
        return res.status(404).json({ msg: "No answer found" });
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/answer/:answer_id/accept
 * @type    PUT
 * @decs    Accept an answer
 */
router.put("/:answer_id/accept", auth, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answer_id);

    if (!answer) return res.status(401).json({ msg: "Answer not found" });

    // Make sure the answer is not being accepted by the one who posted it
    if (answer.user.toString() === req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    // Check if the user who's accepting the answer is the one who posted the question
    const question_id = answer.question_id;

    const question = await Question.findById(question_id);

    if (question.user.toString() !== req.user.id)
      return res.status(401).json({
        msg:
          "You cannot accept this answer because you didn't post this question"
      });

    // Check if it's already accepted
    if (answer.accepted === true) {
      answer.accepted = false;
    } else {
      answer.accepted = true;
    }

    await answer.save();

    res.json(answer);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No answer found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:question_id
 * @type    GET
 * @desc    Get all answers
 */
router.get("/", async (req, res) => {
  try {
    const answers = await Answer.find();
    res.json(answers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:answer_id
 * @type    GET
 * @desc    Get answer by ID
 */
router.get("/:answer_id", async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answer_id);

    if (!answer) return res.status(404).json({ msg: "No answer found" });

    res.json(answer);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No answer found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/answer/:answer_id/upvote
 * @type    GET
 * @desc    Upvote an asnwer
 */
router.put("/:answer_id/upvote", auth, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answer_id);

    // Check if it's downvoted already
    if (
      answer.downvotes.filter(dv => dv.user.toString() === req.user.id).length >
      0
    ) {
      const index = answer.downvotes.map(dv => dv.user).indexOf(req.user.id);
      answer.downvotes.splice(index, 1);
      await answer.save();
    }

    // Check if it's already upvoted
    if (
      answer.upvotes.filter(uv => uv.user.toString() === req.user.id).length > 0
    ) {
      const index = answer.upvotes.map(uv => uv.user).indexOf(req.user.id);
      answer.upvotes.splice(index, 1);
    } else {
      answer.upvotes.unshift({ user: req.user.id });
    }

    await answer.save();
    res.json(answer);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No answer found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:answer_id/downvote
 * @type    GET
 * @desc    Downvote an answer
 */
router.put("/:answer_id/downvote", auth, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answer_id);

    // Check if it's upvoted already
    if (
      answer.upvotes.filter(uv => uv.user.toString() === req.user.id).length > 0
    ) {
      const index = answer.upvotes.map(uv => uv.user).indexOf(req.user.id);
      answer.upvotes.splice(index, 1);
      await answer.save();
    }

    // Check if it's already downvoted
    if (
      answer.downvotes.filter(dv => dv.user.toString() === req.user.id).length >
      0
    ) {
      const index = answer.downvotes.map(dv => dv.user).indexOf(req.user.id);
      answer.downvotes.splice(index, 1);
    } else {
      answer.downvotes.unshift({ user: req.user.id });
    }

    await answer.save();

    res.json(answer);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No answer found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/answer/:answer_id/comment
 * @type    POST
 * @desc    Add a comment
 */
router.post(
  "/:answer_id/comment",
  [
    auth,
    [
      check("text", "The text field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      let answer = await Answer.findById(req.params.answer_id);

      const user = await User.findById(req.user.id).select("-password");

      let commentData = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id
      };

      answer.comments.unshift(commentData);

      await answer.save();

      res.json(answer);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId")
        return res.status(404).json({ msg: "No answer found" });
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/answer/comment/:comment_id
 * @type    PUT
 * @desc    Update a comment
 */
router.put(
  "/comment/:comment_id",
  [
    auth,
    [
      check("text", "The text field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      let answer = await Answer.findOneAndUpdate(
        {
          "comments._id": req.params.comment_id,
          "comments.user": req.user.id
        },
        { $set: { "comments.$.text": req.body.text } },
        { new: true }
      );

      res.json(answer);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId")
        return res.status(404).json({ msg: "No answer found" });
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/question/comment/:comment_id
 * @type    PUT
 * @desc    Delete a comment
 */
router.delete("/comment/:comment_id", auth, async (req, res) => {
  try {
    const answer = await Answer.findOneAndUpdate(
      { "comments._id": req.params.comment_id },
      {
        $pull: { comments: { _id: req.params.comment_id, user: req.user.id } }
      },
      { new: true }
    );

    res.json(answer);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No answer found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/answer/:answer_id
 * @type    PUT
 * @desc    Delete a answer
 */
router.delete("/:answer_id", auth, async (req, res) => {
  try {
    await Answer.findOneAndRemove({
      _id: req.params.answer_id,
      user: req.user.id
    });

    res.send("Answer deleted");
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No answer found" });
    res.status(500).send("Server Error");
  }
});

module.exports = router;
