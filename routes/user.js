const router = require("express").Router();
const userController = require("../controllers/userController");

const verifyToken = require("../middleware/verifyToken");

// api/user/register
router.post("/register", userController.register);

// api/user/login
router.post("/login", userController.login);

// api/user/logout
router.post("/logout", verifyToken, userController.logout);

// api/user
router.get("/", verifyToken, userController.get);

// api/user
router.delete("/", verifyToken, userController.delete);

// api/user
router.put("/   ", verifyToken, userController.update);

module.exports = router;
