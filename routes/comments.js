const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");

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
      username: req.body.user.username,
    },
    replies: [],
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
});

router.delete("/comments/:id", async (req, res) => {
  try {
    const myId = req.params.id;

    const comment = await Comment.findOneAndDelete({ id: myId });

    res.send(comment);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/comments/:id", async (req, res) => {
  try {
    const myId = JSON.parse(req.params.id);

    let comment = await Comment.findOne({ id: myId });
    const reply = {
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
        username: req.body.user.username,
      },
    };
    comment.replies = [...comment.replies, reply];

    const newReply = await comment.save();
    res.status(201).json(newReply);
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
});


router.delete("/replies/:id", async (req, res) => {
  try {
    const myId = JSON.parse(req.params.id);

    const comment = await Comment.findOne({'replies.id': myId });

    console.log(myId)
    console.log(comment)

    res.send(comment);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
