const router = require("express").Router();
const userController = require("../controllers/userController");

// api/user/register
router.post("/register", userController.register);

// api/user/login
router.post("/login", userController.login);

// api/user
router.get("/", userController.get);

// api/user
router.delete("/", userController.delete);

// api/user
router.put("/", userController.update);

router.put("/profile", userController.updateProfile);

router.put("/password", userController.updatePassword);

module.exports = router;
