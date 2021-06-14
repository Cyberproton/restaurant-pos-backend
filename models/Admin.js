const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  role: { type: String, required: true },
  dateofbirth: { type: String },
  mailaddress: { type: String },
  salary: { type: String, required: true },
});

module.exports = mongoose.model("admin", adminSchema);
