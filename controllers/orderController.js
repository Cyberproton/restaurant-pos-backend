const mongoose = require("mongoose");
const Order = require("../models/Order");
const Food = require("../models/food");

// Get all history order of User
exports.getOrders = (req, res, next) => {
  Order.find({ buyer: req.params.userId })
    .exec()
    .then((data) => {
      res.status(200).send({ orders: data });
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
        res.status(200).json({ order: data });
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
      foodId: req.body.foodId,
      quantity: req.body.quantity,
      buyer: req.body.userId,
      note: req.body.note ? req.body.note: ""
    });
    order
      .save()
      .then(order => res.status(200).json({ order: order }))
      .catch(err => res.status(500).json({ error: err }))
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
      res.status(200).json({ order: result, message: "Order deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.updateOrder = (req, res, next) => {
  const id = req.params.orderId;
  Order
    .findByIdAndUpdate(id, req.body)
    .exec()
    .then((order) => res.status(200).json({ order: order }))
    .catch((err) => res.status(500).json({ error: err }))
}

exports.getAllOrders = (req, res, next) => {
  Order
    .find()
    .populate("food")
    .exec()
    .then(orders => res.status(200).json({ orders: orders }))
    .catch(err => res.status(500).json({ error: err }))
};
