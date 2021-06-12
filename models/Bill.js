const mongoose = require("mongoose");

// Note: orders là array, người dùng có thể thanh toán nhiều order cùng lúc 
const billSchema = mongoose.Schema({
  orders: [ { type: mongoose.Schema.Types.ObjectId, ref: "order" } ],
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    require: true
  },
  payment: { type: Number, require: true },
  paymentMethod: { type: String, default: "Cash" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("bill", billSchema);