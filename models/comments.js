const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default : Date.now
  },
  score: {
    type: Number,
    required: true,
  },
  user: {
    image: {
      png:  {
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
//   replies: [replySchema],
});

module.exports = mongoose.model('Comment', commentSchema)