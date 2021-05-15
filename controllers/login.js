const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


module.exports = async (req, res) => {
    // Lets validate the data vefore we a user
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // Checking if the username exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Username is not found');

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
}