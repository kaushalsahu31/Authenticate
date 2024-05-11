const express = require('express');
const router = express.Router();
const {addToSpam,removeFromSpam} = require('../controllers/spamController');
const {authenticate} = require('../middleware/authMiddleware');

router.use(authenticate); // Middleware for authentication


router.post('/', addToSpam);
router.delete('/', removeFromSpam);

module.exports = router;