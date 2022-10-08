const express = require('express')
const router = express.Router();
const Comment = require('../models/comments')

// Retrieves comments
router.get('/comments',  (req, res) => {
     Comment.find().then((result) => {
      res.send(result)
     }).catch((err) => {
      console.log(err)
     })
})

module.exports = router