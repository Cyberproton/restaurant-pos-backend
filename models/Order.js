const mongoose = require("mongoose");

// Option tự động thêm trường food vào response
const opts = { toJSON: { virtuals: true } };
// Note: Order chỉ thể hiện duy nhất một loại đồ ăn, 
// để nhà bếp dễ xác nhận hoặc từ chối một món nào đó
// Note: state gồm Pending (đang chờ xử lý), Accepted (chấp nhận), Rejected (từ chối)
const orderSchema = mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  state: { 
    type: String,
    default: "Pending"
  },
  reason: {
    type: String,
    default: ""
  },
  note: {
    type: String,
    default: ""
  }
}, opts);

// Tạo trường food ảo để truyền vào response
orderSchema.virtual("food", { ref: "food", localField: "foodId", foreignField: "_id", justOne: true })

module.exports = mongoose.model("order", orderSchema);
