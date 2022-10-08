const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  // Comments
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    // type: Date,
    required: true,
    // default: Date.now,
  },
  score: {
    type: Number,
    required: true,
  },
  user: {
    image: {
      png: {
        type: String,
        required: true,
      },
      webp: {
        type: String,
        required: true,
      },
    },
    username: {
      type: String,
      required: true,
    },
  },
  // Replies
  replies: [
    {
      id: {
        type: Number,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
        // type: Date,

        required: true,
        // default: Date.now,
      },
      score: {
        type: Number,
        required: true,
      },
      replyingTo: {
        type: String,
        required: true,
      },
      user: {
        image: {
          png: {
            type: String,
            required: true,
          },
          webp: {
            type: String,
            required: true,
          },
        },
        username: {
          type: String,
          required: true,
        },
      },
    },
  ],
  required: false,
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
