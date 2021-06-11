const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  loginValidation,
  adminRegisterValidation,
} = require("../middleware/validation");

// Login admin account
exports.login = async (req, res) => {
  // Lets validate the data vefore we a admin
  console.log(req.body);

  const { e } = loginValidation(req.body);
  if (e) res.status(500).send({ msg: e.message });

  // Checking if the username exists
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(400).send("Username is not found");

  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // Create and assign a token
  const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET);

  // Create cookie
  const maxAge =
    req.params.remember === "true" ? 10 * 365 * 24 * 60 * 60 : 60 * 5 * 1000;
  res.cookie("token", token, { maxAge: maxAge });

  res.status(200).send(token);
};

// Logout admin account
exports.logout = (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("token");
    res.status(200).send({ msg: "Logout successful" });
  } catch (e) {
    res.status(500).send({ msg: e.message });
  }
};

// Add a admin account = register
exports.add = async (req, res, next) => {
  // Lets validate the data vefore we a admin
  const { e } = adminRegisterValidation(req.body);
  if (e) res.status(500).send({ msg: e.message });

  // Checking if the username is already in database
  const usernameExit = await Admin.findOne({ username: req.body.username });
  if (usernameExit) return res.status(400).send("Username already exists");

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new admin
  const admin = new Admin({
    username: req.body.username,
    password: hashPassword,
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    role: req.body.role,
    dateofbirth: req.body.dateofbirth,
    mailaddress: req.body.mailaddress,
    salary: req.body.salary,
  });

  try {
    const savedAdmin = await admin.save();
    res.send({ admin: admin._id });
  } catch (e) {
    res.status(500).send({ msg: e.message });
  }
};

// Get all admin account infomation
exports.get = async (req, res, next) => {
  const admin = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = admin.id;
  const adminExists = await Admin.findOne({ _id: id });
  if (!adminExists) return res.status(400).send("Admin is not found");
  if (adminExists.role !== "boss")
    return res.status(400).send("Admin is not boss");
  Admin.find()
    .exec()
    .then((accounts) =>
      res.json({
        accounts: accounts,
      })
    )
    .catch((err) =>
      res.send("Error while retrieving from database: " + err.message)
    );
};

// Delete a admin account
exports.delete = async (req, res, next) => {
  const admin = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = admin.id;
  // Check admin exists
  const adminExists = await Admin.findOne({ _id: id });
  if (!adminExists) return res.status(400).send("Admin is not found");
  // Delete account
  Admin.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Admin deleted",
      });
    })
    .catch((e) => {
      res.status(500).send({ msg: e.message });
    });
};

// Update the admin account infomation
exports.update = async (req, res, next) => {
  const id = req.params.adminId;
  // Check admin exists
  const AdminExists = await Admin.findOne({ _id: id });
  if (!adminExists) return res.status(400).send("Admin is not found");

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new admin
  const admin = new Admin({
    _id: id,
    username: req.body.username,
    password: hashPassword,
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    role: req.body.role,
    dateofbirth: req.body.dateofbirth,
    mailaddress: req.body.mailaddress,
    salary: req.body.salary,
  });
  Admin.updateOne({ _id: id }, admin)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Admin updated",
      });
    })
    .catch((e) => {
      res.status(500).send({ msg: e.message });
    });
};
