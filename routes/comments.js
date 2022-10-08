const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('TEst12')
})


module.exports = router