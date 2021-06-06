const router = require('express').Router();
const userRouter = require('./user');
const employeeRouter = require('./employee');
const qrcodeRouter = require('./qrcode')

function route(app) {
    // User router
    app.use('/api/user', userRouter);

    // Employee router
    app.use('/api/employee', employeeRouter);

    // QR Code router
    app.use('/api/qrcode', qrcodeRouter)
}

module.exports = route;