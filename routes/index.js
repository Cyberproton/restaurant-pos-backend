const router = require("express").Router();
const userRouter = require("./user");
const adminRouter = require("./admin");
const foodRouter = require("./food");

function route(app) {
  // User router
  app.use("/api/user", userRouter);

  // Admin router
  app.use("/api/admin", adminRouter);

  // Food router
  app.use("/api/food", foodRouter);

  // Admin router
  app.use("/api/admin", adminRouter);
}

module.exports = route;
