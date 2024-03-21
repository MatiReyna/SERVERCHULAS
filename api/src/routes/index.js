const { Router } = require('express');
const mainRouter = Router();

// Aca van a estar las route's.
const serviceRouter = require('./serviceRouter');

// Entry points.
mainRouter.use('/service', serviceRouter);

module.exports = mainRouter