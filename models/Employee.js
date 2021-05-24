const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String },
    phonenumber: { type: String },
    work: { type: String },
    dateofbirth: { type: String },
    mailaddress: { type: String },
    salary: { type: Number , required: true },

});

module.exports = mongoose.model('employee', employeeSchema);