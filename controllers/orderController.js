const mongoose = require("mongoose");
const Order = require("../models/Order");
const Food = require("../models/food");
const User = require("../models/User")

// Get all history order of User
exports.getOrders = (req, res, next) => {
  Order.find({ buyer: req.params.userId })
    .exec()
    .then((data) => {
      res.status(200).send({ orders: data });
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: err.message });
    });
};

// Get one order by Id
exports.getOrder = (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({ order: data });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: err.message });
    });
};

// Add new an Order
exports.addOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById({ _id: userId });
    if (!user) { 
      res.status(400).json({ message: "User is not found" });
      return;
    }

    const order = new Order({
      foodId: req.body.foodId,
      quantity: req.body.quantity,
      buyer: user._id,
      note: req.body.note ? req.body.note: ""
    });
    order
      .save()
      .then(order => res.status(200).json({ order: order }))
      .catch(err => res.status(500).json({ error: err, message: err.message }));
  } catch (error) {
    res.status(500).json({ error: err });
    return;
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
    .findByIdAndUpdate(id, req.body, { new: true })
    .exec()
    .then((order) => res.status(200).json({ order: order }))
    .catch((err) => res.status(500).json({ error: err, message: err.message }))
}

exports.getAllOrders = (req, res, next) => {
  Order
    .find()
    .populate("food")
    .exec()
    .then(orders => res.status(200).json({ orders: orders }))
    .catch(err => res.status(500).json({ error: err, message: err.messsage }))
};

const validStates = {
  "Pending": 1,
  "Accepted": 2,
  "Done": 10,
  "Rejected": 11,
  "Cancelled": 12
}

// Use this to update order's state instead of updateOrder
exports.updateOrderState = async (req, res, next) => {
  const id = req.params.orderId;
  const state = req.body.state;
  const reason = req.body.reason;

  if (!state || !validStates[state]) {
    res.status(400).json({ message: "New state is invalid" });
    return;
  }
  const order = await Order.findById(id).exec();
  if (!order) {
    res.status(400).json({ message: "Order not found" });
    return;
  }
  const currentState = order.state;

  if (currentState === "Cancelled") {
    res.status(400).json({ order: order, message: "Order has already been cancelled by user" });
    return;
  }
  if (currentState === "Rejected") {
    res.status(400).json({ order: order, message: "Order has already been rejected" });
    return;
  }
  if (currentState === "Done") {
    res.status(400).json({ order: order, message: "Order has already been completed" });
    return;
  }
  if (validStates[currentState] >= validStates[state]) {
    res.status(400).json({ order: order, message: "Order state may have already updated" });
    return;
  }

  if (reason) {
    order.reason = reason;
  }
  order.state = state;
  order
    .save()
    .then(order => res.status(200).json({ order: order }))
    .catch(err => res.status(500).json({ error: err, message: err.message }))
};
