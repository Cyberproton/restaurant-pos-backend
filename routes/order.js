const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const orderController = require("../controllers/orderController");

router.get("/", verifyToken, orderController.getAllOrders);

router.get("/user/:userId", verifyToken, orderController.getOrders);

router.get("/:orderId", verifyToken, orderController.getOrder);

router.post("/", verifyToken, orderController.addOrder);

router.delete("/:orderId", verifyToken, orderController.deleteOrder);

router.put("/:orderId", verifyToken, orderController.updateOrder);

router.put("/:orderId/state", verifyToken, orderController.updateOrderState);

module.exports = router;
