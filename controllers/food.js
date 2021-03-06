const { Model, model } = require("mongoose");
const FoodModel = require("../models/food");

const getFoods = (req, res, next) => {
  FoodModel.find()
    .exec()
    .then((foods) =>
      res.json({
        foods: foods,
      })
    )
    .catch((err) =>
      res.send("Error while retrieving from database: " + err.message)
    );
};

const getFood = (req, res, next) => {
  FoodModel.findById(req.params.id)
    .exec()
    .then((food) =>
      res.status(200).json({
        food: food,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
};

const addFood = (req, res, next) => {
  try {
    let name = String(req.body.name);
    let imageUrl = String(req.body.imageUrl);
    let description = String(req.body.description);
    let price = Number(req.body.price);
    let model = new FoodModel(req.body);
    model
      .save()
      .then((food) =>
        res.json({
          food: food,
        })
      )
      .catch((err) =>
        res.send("Error while saving to database: " + err.message)
      );
  } catch (err) {
    res.send("Error has happened: " + err.message);
  }
};

// Note: Function will return null if the food does not exist
const updateFood = (req, res, next) => {
  FoodModel.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .exec()
    .then((food) => res.status(200).json({ food: food }))
    .catch((err) => res.status(500).json({ error: err }));
};

const deleteFood = (req, res, next) => {
  FoodModel.findByIdAndRemove(req.body._id)
    .exec()
    .then((food) => res.status(200).json({ food: food }))
    .catch((err) => res.status(500).json({ error: err }));
};

const lockFood = (req, res) => {
  FoodModel.updateOne({ _id: req.body._id }, { $set: { lock: true } })
    .exec()
    .then((food) => res.status(200).send("Successful"))
    .catch((err) => res.status(500).json({ error: err }));
};

const unLockFood = (req, res) => {
  FoodModel.updateOne({ _id: req.body._id }, { $set: { lock: false } })
    .exec()
    .then((food) => res.status(200).send("Successful"))
    .catch((err) => res.status(500).json({ error: err }));
};

module.exports = {
  getFoods,
  getFood,
  addFood,
  updateFood,
  deleteFood,
  lockFood,
  unLockFood,
};
