const router = require('express').Router();
const userRouter = require('./user');
const employeeRouter = require('./employee');

function route(app) {
    // User router
    app.use('/api/user', userRouter);

    // Employee router
    app.use('/api/employee', employeeRouter);
}

module.exports = route;