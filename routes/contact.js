const express = require('express');
const router = express.Router();
const {getContacts,addContact} = require('../controllers/contactController');
const {authenticate} = require('../middleware/authMiddleware');

router.use(authenticate); 

router.get('/', getContacts);
router.post('/', addContact);

module.exports = router;
