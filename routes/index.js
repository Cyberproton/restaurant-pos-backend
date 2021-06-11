const router = require('express').Router();
const userRouter = require('./user');
const employeeRouter = require('./employee');
const orderRouter = require('./order')

function route(app) {
    // User router
    app.use('/api/user', userRouter);

    // Employee router
    app.use('/api/employee', employeeRouter);
    
    // Order router
    app.use("/api/order", orderRouter);
}

module.exports = route;
