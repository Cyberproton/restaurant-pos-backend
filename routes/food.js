const express = require("express");
const router = express.Router();
const {
  addFood,
  getFood,
  getFoods,
  updateFood,
  deleteFood,
  lockFood,
  unLockFood,
} = require("../controllers/food");

router.route("/").get(getFoods);
router.route("/:id").get(getFood);
router.route("/add").post(addFood);
router.route("/update").post(updateFood);
router.route("/delete").post(deleteFood);
router.route("/lock").post(lockFood);
router.route("/unlock").post(unLockFood);

module.exports = router;
