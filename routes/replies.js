const express = require("express");
const router = express.Router();
const Reply = require("../models/replies");

// Adding Replies
router.patch('/comment:id', (req, res) => {
    const reply = new Reply({
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
      });

 console.log(req.body)


})


module.exports = router;
