const router = require("express").Router();
const orderTestController = require("../controllers/orderTestController");

router.post("/add", orderTestController.addOrder);

router.get("/new", orderTestController.getNewOrders);

router.get("/processing", orderTestController.getProcessingOrders);

router.get("/deliver", orderTestController.getDeliverOrders);

router.get("/finished", orderTestController.getFinishedOrders);

router.get("/user", orderTestController.getUserOrder);

router.get("/:orderId", orderTestController.getOrderById);

router.post("/delete", orderTestController.deleteOrder);

router.post("/update-state", orderTestController.updateOrderState);

router.post("/payment", orderTestController.payment);

router.put("/payment", orderTestController.payment);

module.exports = router;
