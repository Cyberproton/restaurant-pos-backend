const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  userRegisterValidation,
  loginValidation,
  userProfileValidation,
  userPasswordValidation
} = require("../middleware/validation");

// Login user account
exports.login = async (req, res) => {
  // Lets validate the data vefore we a user
  const { error } = loginValidation(req.body);
  if (error) { 
    res.status(500).send({ message: error.message });
    return;
  }

  // Checking if the username exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Username is not found");

  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // Create and assign a token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

  // Create cookie
  const maxAge =
    req.params.remember === "true" ? 10 * 365 * 24 * 60 * 60 : 60 * 5 * 1000;
  res.cookie("token", token, { maxAge: maxAge });

  res.status(200).send(token);
};

// Register user account
exports.register = async (req, res) => {
  // Lets validate the data vefore we a user
  const { error } = userRegisterValidation(req.body);
  if (error) { 
    res.status(500).json({ message: error.message });
    return;
  }

  // Checking if the username is already in database
  const usernameExit = await User.findOne({ username: req.body.username });
  if (usernameExit) return res.status(400).json({ message: "Username already exists" });

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
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
    res.status(500).json({ message: e.message });
  }
};

// Logout user account
exports.logout = (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("token");
    res.status(200).send({ message: "Logout successful" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

// Get user account infomation
exports.get = async (req, res, next) => {
  const user = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = user.id;
  // Check user exists
  const userExists = await User.findOne({ _id: id });
  if (!userExists) return res.status(400).json({ message: "User is not found" });
  // get account
  User.findById(id)
    .exec()
    .then((result) => {
      res.status(200).send(result.toObject());
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

// Delete user account
exports.delete = async (req, res, next) => {
  const user = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = user.id;
  // Check user exists
  const userExists = await User.findOne({ _id: id });
  if (!userExists) return res.status(400).send("User is not found");
  // Delete account
  User.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      // Clear cookie
      res.clearCookie("token");
      //console.log(result);
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

// Update user account infomation
exports.update = async (req, res, next) => {
  const data = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = data.id;
  // Check user exists
  const userExists = await User.findOne({ _id: id });
  if (!userExists) return res.status(400).send("User is not found");

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Update a new user
  const user = new User({
    _id: id,
    username: req.body.username,
    password: hashPassword,
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    birthday: req.body.birthday,
    address: req.body.address,
  });

  User.findByIdAndUpdate(id, user, { new: true })
    .exec()
    .then((result) => {
      result.password = "";
      res.status(200).json({
        user: result,
        message: "User Update",
      });
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

exports.updateProfile = async (req, res, next) => {
  const data = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = data.id;
  // Check user exists
  const userExists = await User.findOne({ _id: id });
  if (!userExists) return res.status(400).json({ message: "User is not found" });

  const { error } = userProfileValidation(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  // Update a new user
  const user = new User({
    _id: id,
    username: req.body.username,
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    birthday: req.body.birthday,
    address: req.body.address,
  });

  User.findByIdAndUpdate(id, user, { new: true })
    .exec()
    .then((result) => {
      result.password = "";
      res.status(200).json({
        user: result,
        message: "User Updated",
      });
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

exports.updatePassword = async (req, res, next) => {
  const data = jwt.verify(req.header("token"), process.env.TOKEN_SECRET);
  const id = data.id;
  const userExists = await User.findById(id).exec();
  if (!userExists) {
    res.status(400).json({ message: "User is not found" });
    return;
  }

  const { error } = userPasswordValidation(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const rePassword = req.body.rePassword;

  if (newPassword !== rePassword) {
    res.status(400).json({ message: "New password and repassword does not match" });
    return;
  }

  const hashedPassword = userExists.password;
  const validPass = await bcrypt.compare(currentPassword, hashedPassword);
  if (!validPass) {
    res.status(400).json({ message: "Current password does not match" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);
  userExists.password = newHashedPassword;
  userExists
    .save()
    .then(user => { 
      user.password = "";
      res.status(200).json({ user: user });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};
