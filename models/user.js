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
        min: 8,
        max: 11,
    },
    dateofbird: { 
        type: Date,
    },
})

module.exports = mongoose.model('User', userSchema);