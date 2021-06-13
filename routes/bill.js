const router = require("express").Router();
const billController = require("../controllers/billController");

router.route("/").get(billController.getBills).post(billController.addBill);

router
  .route("/:billId")
  .get(billController.getBill)
  .delete(billController.deleteBill);

router.route("/employee/:employeeId").get(billController.getBillsByEmployee);

module.exports = router;
