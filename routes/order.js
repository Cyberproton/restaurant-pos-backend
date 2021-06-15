const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);

router.get("/user/:userId", orderController.getOrders);

router.get("/:orderId", orderController.getOrder);

router.post("/", orderController.addOrder);

router.delete("/:orderId", orderController.deleteOrder);

router.put("/:orderId", orderController.updateOrder);

router.put("/:orderId/state", orderController.updateOrderState);

module.exports = router;
