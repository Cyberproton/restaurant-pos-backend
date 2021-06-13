const router = require("express").Router();
const adminController = require("../controllers/adminController");

// api/admin
router.get("/", adminController.get);

// api/admin/add
router.post("/login", adminController.login);

// api/admin/add
router.post("/add", adminController.add);

// api/admin/all
router.get("/all", adminController.getall);

// api/admin/role
router.get("/role", adminController.getRole);

// api/admin/delete
router.post("/delete", adminController.delete);

// api/admin/update
router.post("/update", adminController.update);

module.exports = router;
