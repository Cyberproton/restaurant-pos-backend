const mongoose = require("mongoose");

const orderTestSchema = mongoose.Schema({
  foods: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "food" },
      name: { type: String, require: true },
      amount: { type: Number, require: true, default: 1 },
      price: { type: Number, require: true },
    },
  ],
  table: { type: Number, require: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: "" },
  time: { type: Date, default: Date.now },
  quantity: { type: Number, require: true },
  payment: { type: Number, require: true },
  paymentMethod: { type: String, default: "" },
  state: { type: String, default: "new" },
  reason: { type: String, default: "" },
});

module.exports = mongoose.model("orderTest", orderTestSchema);
