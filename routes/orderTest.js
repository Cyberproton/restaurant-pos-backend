const router = require("express").Router();
const orderTestController = require("../controllers/orderTestController");

router.post("/add", orderTestController.addOrder);

router.get("/new", orderTestController.getNewOrders);

router.get("/processing", orderTestController.getProcessingOrders);

router.get("/deliver", orderTestController.getDeliverOrders);

router.get("/finished", orderTestController.getFinishedOrders);

router.get("/user/:userId", orderTestController.getUserOrder);

router.get("/:orderId", orderTestController.getOrderById);

router.post("/delete", orderTestController.deleteOrder);

router.post("/update-state", orderTestController.updateOrderState);

router.put("/payment", orderTestController.payment);

module.exports = router;
