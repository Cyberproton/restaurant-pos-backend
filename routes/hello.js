const express = require('express')
const { postHello, getHello } = require('../controllers/hello')
const router = express.Router()

router.route('/')
    .post(postHello)
    .get(getHello)

module.exports = router