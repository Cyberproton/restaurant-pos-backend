const mongoose = require("mongoose");

const orderTestSchema = mongoose.Schema({
  foods: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "food" },
      name: { type: String, require: true },
      count: { type: Number, require: true, default: 1 },
    },
  ],
  table: { type: Number, require: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  time: { type: Date, default: Date.now },
  quantity: { type: Number, require: true },
  payment: { type: Number, require: true },
  paymentMethod: { type: String },
  state: { type: String, default: "new" },
});

module.exports = mongoose.model("orderTest", orderTestSchema);
