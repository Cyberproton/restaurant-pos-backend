const mongoose = require("mongoose");
const Order = require("../models/order");
const Food = require("../models/food");

// Get all history order of User
exports.getOrders = (req, res, next) => {
  Order.find({ buyer: req.body.userId })
    .exec()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Get one order by Id
exports.getOrder = (req, res, next) => {
  Order.find({ _id: req.params.orderId })
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Add new an Order
exports.addOrder = (req, res, next) => {
  try {
    const order = new Order({
      foorId: req.body.foorId,
      quantity: req.body.quantity,
      buyer: req.body.userId,
    });
    return order.save();
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

// Delete a order by id
exports.deleteOrder = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).send({ message: "Order deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
