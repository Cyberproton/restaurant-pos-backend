const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation, employeeRegisterValidation } = require('../middleware/validation');

// Login employee account
exports.login = async (req, res) => {
    // Lets validate the data vefore we a employee
    const { e } = loginValidation(req.body);
    if (e)
        res.status(500).send({ msg: e.message });

    // Checking if the username exists
    const employee = await Employee.findOne({ username: req.body.username });
    if (!employee) return res.status(400).send('Username is not found');

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, employee.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    // Set cookie save
    const maxAge = req.params.remember === "true" ? (10 * 365 * 24 * 60 * 60) : (60 * 5 * 1000);
    res.cookie('token_mama', token, { maxAge: maxAge });

    res.status(200).send({ msg: 'Login successful' });
}


// Add a employee account = register 
exports.add = async (req, res, next) => {
    // Lets validate the data vefore we a employee
    const { e } = employeeRegisterValidation(req.body);
    if (e)
        res.status(500).send({ msg: e.message });

    // Checking if the username is already in database
    const usernameExit = Employee.findOne({ username: req.body.username });
    if (usernameExit) return res.status(400).send('Username already exists');

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new employee
    const employee = new Employee({
        username: req.body.username,
        password: hashPassword,
        fullname: req.body.fullname,
        phonenumber: req.body.phonenumber,
        work: req.body.work,
        dateofbirth: req.body.dateofbirth,
        mailaddress: req.body.mailaddress,
        salary: req.body.salary,
    });
    try {
        const savedEmployee = await employee.save();
        res.send({ employee: employee._id });
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
};


// Get a employee account infomation
exports.get = async (req, res, next) => {
    const id = req.params.employeeId;
    // Check employee exists
    const employeeExists = await Employee.findOne({ _id: id });
    if (!employeeExists) return res.status(400).send('User is not found');
    // get account
    User.findById(id)
        .exec()
        .then(result => {
            res.status(200).send(result.toObject());
        })
        .catch(e => {
            res.status(500).send({ msg: e.message });
        });
};

// Delete a employee account
exports.delete = async (req, res, next) => {
    const id = req.params.employeeId;
    // Check employee exists
    const employeeExists = await Employee.findOne({ _id: id });
    if (!employeeExists) return res.status(400).send('User is not found');
    // Delete account
    User.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Employee deleted"
            });
        })
        .catch(e => {
            res.status(500).send({ msg: e.message });
        });
};


// Update the employee account infomation
exports.update = async (req, res, next) => {
    const id = req.params.employeeId;
    // Check employee exists
    const employeeExists = await Employee.findOne({ _id: id });
    if (!employeeExists) return res.status(400).send('User is not found');

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new employee
    const employee = new Employee({
        _id: id,
        username: req.body.username,
        password: hashPassword,
        fullname: req.body.fullname,
        phonenumber: req.body.phonenumber,
        work: req.body.work,
        dateofbirth: req.body.dateofbirth,
        mailaddress: req.body.mailaddress,
        salary: req.body.salary,
    });
    User.updateOne({ _id: id }, employee)
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Employee updated"
            });
        })
        .catch(e => {
            res.status(500).send({ msg: e.message });
        });
};