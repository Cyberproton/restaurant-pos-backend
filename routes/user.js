const router = require('express').Router();
const userController = require('../controllers/userController');

// api/user/register
router.post('/register', userController.register);

// api/user/login
router.post('/login', userController.login);

// api/user/logout
router.post('/logout', userController.logout);

// api/user/:userId
router.get('/:userId', userController.get);

// api/user/:userId
router.delete('/:userId', userController.delete);

// api/user/:userId
router.put('/:userId', userController.update);

module.exports = router;