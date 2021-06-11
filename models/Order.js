const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  idUser: { type: String, default: "" },
  listFood: { type: String, default: "" },
  price: { type: Number, require: true },
  numberOfFood: { type: Number, require: true },
  numberOfType: { type: Number, require: true },
});

module.exports = mongoose.model("Order", OrderSchema);
