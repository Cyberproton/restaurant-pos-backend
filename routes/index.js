const router = require('express').Router();
// Import User Router
let authRouter = require('./auth');

function route(app) {
    // User router
    app.use('/api/user', authRouter);

    // Home router
    //app.use('/', homeRouter);
}

module.exports = route;