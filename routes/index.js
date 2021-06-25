const router = require("express").Router();
const userRouter = require("./user");
const adminRouter = require("./admin");
const foodRouter = require("./food");
const orderRouter = require("./order");
const billRouter = require("./bill");
const qrCodeRouter = require("./qrcode");
const orderTestRouter = require("./orderTest");

function route(app) {
  // User router
  app.use("/api/user", userRouter);

  // Admin router
  app.use("/api/admin", adminRouter);

  // Food router
  app.use("/api/food", foodRouter);

  // Admin router
  app.use("/api/admin", adminRouter);

  // Order router
  // app.use("/api/order", orderRouter);

  // Order router
  app.use("/api/order", orderTestRouter);

  // Bill router
  app.use("/api/bill", billRouter);

  // QR router
  app.use("/api/qrcode", qrCodeRouter);
}

module.exports = route;
