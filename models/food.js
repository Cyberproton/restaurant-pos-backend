const mongoose = require('mongoose')

const food = new mongoose.Schema({
    name: { type: String, require: true },
    imageUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 }
})

module.exports = mongoose.model('food', food)