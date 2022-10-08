const express = require('express')
const router = express.Router();

router.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });

module.exports = router