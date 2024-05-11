const express = require('express');
const router = express.Router();
const { register, login, deleteAccount, updateAccount } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.use(authenticate); 
router.delete('/account', deleteAccount);
router.patch('/account', updateAccount);




module.exports = router;