const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


module.exports = async (req, res) => {
    // Lets validate the data vefore we a user
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // Checking if the username is already in database
    const usernameExit = await User.findOne({ username: req.body.username });
    if (usernameExit) return res.status(400).send('Username already exists');

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        username: req.body.username,
        password: hashPassword,
        fullname: req.body.fullname,
        phonenumber: req.body.phonenumber,
        dateofbird: req.body.dateofbird,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).error();
    }
}