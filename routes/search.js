const express = require('express');
const router = express.Router();
const {searchContacts} = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware.authenticate); 

router.get('/', searchContacts);

module.exports = router;

