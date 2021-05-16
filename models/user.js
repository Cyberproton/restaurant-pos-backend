const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        require: true,
        min: 6,
        max: 255,
    },
    password: { 
        type: String, 
        require: true,
        min: 6,
        max: 1024,
    },
    fullname: { 
        type: String, 
        default: 'Customer',
        min: 6,
        max: 255,
    },
    phonenumber: { 
        type: String, 
        min: 6,
        max: 12,
    },
    dateofbird: { 
        type: String,
        min: 8,
        max: 11,
    },
})

module.exports = mongoose.model('User', userSchema);