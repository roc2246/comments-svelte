const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");

// import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locale/en";
// TimeAgo.addLocale(en);

router.get("/comments", (req, res) => {
  Comment.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/newComment", async (req, res) => {
  const comment = new Comment({
    id: req.body.id,
    content: req.body.newcomment,
    createdAt: req.body.createdat,
    score: 0,
    replyingTo: req.body.replyingto,
    user: {
      image: {
        png: req.body.user.image.png,
        webp: req.body.user.image.webp,
      },
      username: req.body.user.username
    },
    replies: [],
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (e) {
    res.status(400).json(e);
    console.log(e)
  }
});

module.exports = router;
