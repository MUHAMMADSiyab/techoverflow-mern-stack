const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Middleware
const auth = require("../../middleware/auth");
// Models
const User = require("../../models/User");
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");

/**
 * @route   /api/question
 * @type    POST
 * @desc    Ask a question
 */
router.post(
  "/",
  [
    auth,
    [
      check("title", "The title field is required")
        .not()
        .isEmpty(),
      check("body", "The body field is required")
        .not()
        .isEmpty(),
      check("tags", "Please add some tags")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, body, tags } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");

      let questionData = {
        title: title,
        body: body,
        tags,
        name: user.name,
        avatar: user.avatar,
        user: user.id
      };

      let question = new Question(questionData);

      await question.save();

      res.json(question);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/question/:question_id
 * @type    PUT
 * @desc    Update a question
 */
router.put(
  "/:question_id",
  [
    auth,
    [
      check("title", "The title field is required")
        .not()
        .isEmpty(),
      check("body", "The body field is required")
        .not()
        .isEmpty(),
      check("tags", "Please add some tags")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, body, tags } = req.body;

    try {
      const questionData = {
        title: title,
        body: body,
        tags: tags
      };

      const question = await Question.findOneAndUpdate(
        { user: req.user.id, _id: req.params.question_id },
        { $set: questionData },
        { new: true }
      );

      res.json(question);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId")
        return res.status(404).json({ msg: "No question found" });
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/question/:question_id
 * @type    GET
 * @desc    Get all questions
 */
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort("-date");
    res.json(questions);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:keywords
 * @type    GET
 * @desc    Search questions
 */
router.get("/search/:keywords", async (req, res) => {
  try {
    const keywords = new RegExp(req.params.keywords, "gi");

    const questions = await Question.find({ title: { $regex: keywords } });

    res.json(questions);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No question found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:question_id
 * @type    GET
 * @desc    Get question by ID
 */
router.get("/:question_id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    if (!question) return res.status(404).json({ msg: "No question found" });

    res.json(question);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No question found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:question_id/upvote
 * @type    GET
 * @desc    Upvote a question
 */
router.put("/:question_id/upvote", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    // Check if the OP is trying to perform this action
    if (question.user.toString() === req.user.id) {
      return res
        .status(401)
        .json({ msg: "You cannot upvote your own question" });
    }

    // Check if it's downvoted already
    if (
      question.downvotes.filter(dv => dv.user.toString() === req.user.id)
        .length > 0
    ) {
      const index = question.downvotes.map(dv => dv.user).indexOf(req.user.id);
      question.downvotes.splice(index, 1);
      await question.save();
    }

    // Check if it's already upvoted
    if (
      question.upvotes.filter(uv => uv.user.toString() === req.user.id).length >
      0
    ) {
      const index = question.upvotes.map(uv => uv.user).indexOf(req.user.id);
      question.upvotes.splice(index, 1);
    } else {
      question.upvotes.unshift({ user: req.user.id });
    }

    await question.save();
    res.json(question);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No question found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:question_id/downvote
 * @type    GET
 * @desc    Downvote a question
 */
router.put("/:question_id/downvote", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.question_id);

    // Check if the OP is trying to perform this action
    if (question.user.toString() === req.user.id) {
      return res
        .status(401)
        .json({ msg: "You cannot downvote your own question" });
    }

    // Check if it's upvoted already
    if (
      question.upvotes.filter(uv => uv.user.toString() === req.user.id).length >
      0
    ) {
      const index = question.upvotes.map(uv => uv.user).indexOf(req.user.id);
      question.upvotes.splice(index, 1);
      await question.save();
    }

    // Check if it's already downvoted
    if (
      question.downvotes.filter(dv => dv.user.toString() === req.user.id)
        .length > 0
    ) {
      const index = question.downvotes.map(dv => dv.user).indexOf(req.user.id);
      question.downvotes.splice(index, 1);
    } else {
      question.downvotes.unshift({ user: req.user.id });
    }

    await question.save();

    res.json(question);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No question found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:question_id/comment
 * @type    POST
 * @desc    Add a comment
 */
router.post(
  "/:question_id/comment",
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
      let question = await Question.findById(req.params.question_id);

      const user = await User.findById(req.user.id).select("-password");

      let commentData = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id
      };

      question.comments.push(commentData);

      await question.save();

      res.json(question.comments);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId")
        return res.status(404).json({ msg: "No question found" });
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/question/:question_id/comment/:comment_id
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
      let question = await Question.findOneAndUpdate(
        {
          comments: {
            $elemMatch: { _id: req.params.comment_id, user: req.user.id }
          }
        },
        { $set: { "comments.$.text": req.body.text } },
        { new: true }
      );

      res.json(question.comments);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId")
        return res.status(404).json({ msg: "No comment found" });
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   /api/question/:question_id/comment/:comment_id
 * @type    PUT
 * @desc    Delete a comment
 */
router.delete("/comment/:comment_id", auth, async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { comments: { $elemMatch: { _id: req.params.comment_id } } },
      {
        $pull: { comments: { _id: req.params.comment_id, user: req.user.id } }
      },
      { new: true }
    );

    res.json(question.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No comment found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route    /api/question/answers
 * @type     GET
 * @desc     Get all answers for this question
 */
router.get("/:question_id/answers", async (req, res) => {
  try {
    const answers = await Answer.find({ question_id: req.params.question_id });
    res.json(answers);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No question found" });
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/question/:question_id
 * @type    PUT
 * @desc    Delete a question
 */
router.delete("/:question_id", auth, async (req, res) => {
  try {
    await Question.findOneAndRemove({
      _id: req.params.question_id,
      user: req.user.id
    });

    await Answer.findOneAndRemove({ question_id: req.params.question_id });

    res.send("Question deleted");
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "No question found" });
    res.status(500).send("Server Error");
  }
});

module.exports = router;
