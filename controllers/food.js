const { Model, model } = require('mongoose')
const FoodModel = require('../models/food')

// Fake database
let db = [ new FoodModel({ name: 'asdsdsd', imageUrl: 'sdsdsa', description: 'assad', price: 5.60 }) ]

// Fake addFood to fake database
const fakePostFood = (req, res, next) => {
    try {
        let name = String(req.body.name)
        let imageUrl = String(req.body.imageUrl)
        let description = String(req.body.description)
        let price = Number(req.body.price)
        console.log(JSON.stringify(req.body))
        console.log(imageUrl)
        console.log(description)
        console.log(price)
        db.push(new FoodModel({ name: name, imageUrl: imageUrl, description: description, price: price }))
        res.send('Completed')
    } catch (err) {
        res.send(err.message)
    }
}

const getFoods = (req, res, next) => {
    FoodModel
        .find()
        .exec()
        .then(foods => res.json(foods))
        .catch(err => res.send('Error while retrieving from database: ' + err.message))
}

const addFood = (req, res, next) => {
    try {
        let name = String(req.body.name)
        let imageUrl = String(req.body.imageUrl)
        let description = String(req.body.description)
        let price = Number(req.body.price)
        let model = new FoodModel({ 
            name: name, 
            imageUrl: imageUrl, 
            description: description, 
            price: price 
        })
        model
            .save()
            .then(food => res.json(food))
            .catch(err => res.send('Error while saving to database: ' + err.message))
    } catch (err) {
        res.send('Error has happened: ' + err.message)
    }
}

// Note: Function will return null if the food does not exist
const editFood = (req, res, next) => {
    FoodModel
        .findByIdAndUpdate(req.body.id, req.body, { new: true })
        .exec()
        .then(food => res.json(food))
        .catch(err => res.send('Error while updating to database: ' + err.message))
}

module.exports = { getFoods, addFood, editFood }