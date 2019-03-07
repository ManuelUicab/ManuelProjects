const authenticate = require('../middlewares/authenticate');
const express = require('express');


const router = express.Router();

router.post('/', authenticate, (req, res) => {
    res.status(201).json({ success: true });
});


module.exports = router;