const OrderTest = require("../models/OrderTest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.set("useFindAndModify", false);

// Get all history order of User
exports.getUserOrder = (req, res) => {
  const user = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = user.id;
  OrderTest.find({ userid: id })
    .exec()
    .then((data) => {
      res.status(200).send({ orders: data });
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: err.message });
    });
};

exports.getNewOrders = (req, res) => {
  OrderTest.find({ state: "new" })
    .exec()
    .then((data) => {
      res.status(200).send({ orders: data });
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: err.message });
    });
};

exports.getProcessingOrders = (req, res) => {
  OrderTest.find({ state: "processing" })
    .exec()
    .then((data) => {
      res.status(200).send({ orders: data });
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: err.message });
    });
};

exports.getDeliverOrders = (req, res) => {
  OrderTest.find({ state: "deliver" })
    .exec()
    .then((data) => {
      res.status(200).send({ orders: data });
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: err.message });
    });
};

exports.getFinishedOrders = (req, res) => {
  OrderTest.find({ state: "finished" })
    .exec()
    .then((data) => {
      res.status(200).send({ orders: data });
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: err.message });
    });
};

exports.getConfirmedOrders = (req, res) => {
  OrderTest.find({ state: "confirmed" })
    .exec()
    .then((data) => {
      res.status(200).send({ orders: data });
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: err.message });
    });
};

// Get one order by Id
exports.getOrderById = (req, res, next) => {
  OrderTest.findById(req.params.orderId)
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
    let order;
    if (req.header("token")) {
      const user = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
      order = new OrderTest({
        userid: user.id,
        foods: req.body.foods,
        table: req.body.table,
        quantity: req.body.quantity,
        payment: req.body.payment,
      });
    } else {
      order = new OrderTest({
        foods: req.body.foods,
        table: req.body.table,
        quantity: req.body.quantity,
        payment: req.body.payment,
      });
    }
    order
      .save()
      .then((order) => res.status(200).json({ order: order }))
      .catch((err) =>
        res.status(500).json({ error: err, message: err.message })
      );
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
};

// Delete a order by id
exports.deleteOrder = (req, res, next) => {
  OrderTest.findByIdAndRemove(req.body._id)
    .exec()
    .then((item) => res.status(200).send("Successful"))
    .catch((err) => res.status(500).json({ error: err }));
};

// Use this to update order's state instead of updateOrder
exports.updateOrderState = (req, res, next) => {
  OrderTest.updateOne(
    { _id: req.body._id },
    { $set: { state: req.body.state } }
  )
    .exec()
    .then((item) => res.status(200).send("Successful"))
    .catch((err) => res.status(500).json({ error: err }));
};

// user set payment method
exports.payment = (req, res, next) => {
  const _id = req.body._id;
  const paymentMethod = req.body.paymentMethod;
  OrderTest.updateOne(
    { _id: _id },
    { $set: { paymentMethod: paymentMethod, state: "finished" } }
  )
    .exec()
    .then((orderTest) => res.status(200).send("Successful"))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getOrders = (req, res, next) => {
  OrderTest
    .find()
    .exec()
    .then(orders => res.status(200).json({ orders: orders }))
    .catch(err => res.status(500).json({ error: err }));
};
