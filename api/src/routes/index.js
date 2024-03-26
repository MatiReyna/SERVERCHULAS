const { Router } = require('express');
const mainRouter = Router();

// Aca van a estar las route's.
const serviceRouter = require('./serviceRouter');
const turnoRouter = require('./turnoRouter');

// Entry points.
mainRouter.use('/service', serviceRouter);
mainRouter.use('/turno', turnoRouter);

module.exports = mainRouter