const express = require('express')
const router = express.Router()
const { addFood, getFood, getFoods, updateFood, deleteFood } = require('../controllers/food')

router.route('/').get(getFoods)
router.route('/:id').get(getFood)
router.route('/add').post(addFood)
router.route('/update').post(updateFood)
router.route('/delete').post(deleteFood)

module.exports = router