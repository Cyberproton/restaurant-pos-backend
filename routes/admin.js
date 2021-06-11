const router = require("express").Router();
const adminController = require("../controllers/adminController");

// api/admin/add
router.post("/login", adminController.login);

// api/admin/logout
router.post("/logout", adminController.logout);

// api/admin/add
router.post("/add", adminController.add);

// api/admin/
router.get("/", adminController.get);

// api/admin/
router.delete("/:employeeId", adminController.delete);

// api/admin/
router.put("/:employeeId", adminController.update);

module.exports = router;
