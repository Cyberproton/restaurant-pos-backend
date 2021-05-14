const express = require('express')
const router = express.Router()
const { addFood, getFoods, editFood } = require('../controllers/food')

router.route('/').get(getFoods)
router.route('/add').post(addFood)
router.route('/edit').post(editFood)

module.exports = router