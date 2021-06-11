const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const orderController = require("../controllers/orderController");

router.get("/", verifyToken, orderController.getOrders);

router.get("/:orderId", orderController.getOrder);

router.post("/", orderController.addOrder);

router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
