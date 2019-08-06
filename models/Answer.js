const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  question_id: {
    type: Schema.Types.ObjectId,
    ref: "question"
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean,
    default: false
  },
  upvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  downvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

const AnswerModel = mongoose.model("answer", AnswerSchema);

module.exports = AnswerModel;
