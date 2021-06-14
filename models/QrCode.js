const mongoose = require('mongoose')

const qrcode = new mongoose.Schema({
    link: { type: String, default: '' }
})

module.exports = mongoose.model('qrcode', qrcode)
