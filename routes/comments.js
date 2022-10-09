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
    id: 88,
    content: "TERST!1",
    createdAt: "TEST",
    score: 0,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo"
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
