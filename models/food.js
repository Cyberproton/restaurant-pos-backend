const mongoose = require('mongoose')

const food = new mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    price: Number
})

module.exports = mongoose.model('food', food)