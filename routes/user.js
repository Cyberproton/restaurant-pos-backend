const router = require("express").Router();
const userController = require("../controllers/userController");

const verifyToken = require("../middleware/verifyToken");

// api/user/register
router.post("/register", userController.register);

// api/user/login
router.post("/login", userController.login);

// api/user/logout
router.post("/logout", verifyToken, userController.logout);

// api/user/:userId
router.get("/:userId", verifyToken, userController.get);

// api/user/:userId
router.delete("/:userId", verifyToken, userController.delete);

// api/user/:userId
router.put("/:userId", verifyToken, userController.update);

module.exports = router;
