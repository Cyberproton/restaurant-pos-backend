const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
