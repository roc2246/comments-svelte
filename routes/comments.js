const express = require('express')
const router = express.Router();
const Comment = require('../models/comment')

router.get('/', async (req, res) => {
   try{
    const comments = await Comment.find()
   } catch(err){
    res.status(500).json({ message: err.message })
   }
})


module.exports = router