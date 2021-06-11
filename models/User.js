const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String },
  phonenumber: { type: String },
  birthday: { type: String },
  address: { type: String },
});

module.exports = mongoose.model("user", userSchema);
