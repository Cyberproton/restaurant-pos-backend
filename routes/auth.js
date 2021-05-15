const router = require('express').Router();
const registerController = require('../controllers/register');
const loginController = require('../controllers/login');

// api/user/register
router.post('/register', registerController);

// api/user/login
router.post('/login', loginController);

module.exports = router;