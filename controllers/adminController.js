const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login admin account
exports.login = async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(400).send("Username is not found");
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send("Invalid password");
  const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET);
  res.status(200).send(token);
};

exports.register = async (req, res) => {
  const usernameExit = await User.findOne({ username: req.body.username });
  if (usernameExit) return res.status(400).send("Username already exists");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    username: req.body.username,
    password: hashPassword,
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    birthday: req.body.birthday,
    address: req.body.address,
  });
  try {
    const savedUser = await user.save();
    const id = await User.findOne({ username: req.body.username });
    const token = jwt.sign({ id: id._id }, process.env.TOKEN_SECRET);
    res.send(token);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// Add a admin account
exports.add = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const account = new Admin({
      username: req.body.username,
      password: hashPassword,
      fullname: req.body.fullname,
      phonenumber: req.body.phonenumber,
      role: req.body.role,
      dateofbirth: req.body.dateofbirth,
      mailaddress: req.body.mailaddress,
      salary: req.body.salary,
    });
    let model = new Admin(account);
    model
      .save()
      .then((account) =>
        res.json({
          account: account,
        })
      )
      .catch((err) =>
        res.send("Error while saving to database: " + err.message)
      );
  } catch (err) {
    res.send("Error has happened: " + err.message);
  }
};

// Get current admin account infomation
exports.get = async (req, res, next) => {
  try {
    const admin = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
    const id = admin.id;
    const adminExists = await Admin.findOne({ _id: id });
    if (!adminExists) return res.status(400).send("Admin is not found");
    res.send(adminExists);
  } catch (err) {
    return res.status(400).send("Admin is not found");
  }
};

// Get role account
exports.getRole = async (req, res, next) => {
  const admin = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = admin.id;
  const adminExists = await Admin.findOne({ _id: id });
  if (!adminExists) return res.status(400).send("Admin is not found");
  res.send(adminExists.role);
};

// Get all admin account infomation
exports.getall = async (req, res, next) => {
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

// Boss delete a account
exports.delete = async (req, res, next) => {
  Admin.findByIdAndRemove(req.body._id)
    .exec()
    .then((account) => res.status(200).json({ account: account }))
    .catch((err) => res.status(500).json({ error: err }));
};

// Update the admin account infomation
exports.update = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const account = new Admin({
    _id: req.body._id,
    username: req.body.username,
    password: hashPassword,
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    role: req.body.role,
    dateofbirth: req.body.dateofbirth,
    mailaddress: req.body.mailaddress,
    salary: req.body.salary,
  });
  Admin.findByIdAndUpdate(req.body._id, account, { new: true })
    .exec()
    .then((account) => res.status(200).json({ account: account }))
    .catch((err) => res.status(500).json({ error: err }));
};
