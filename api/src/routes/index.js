const { Router } = require('express');
const mainRouter = Router();

// Aca van a estar las route's.
const serviceRouter = require('./serviceRouter');
const turnoRouter = require('./turnoRouter');
const userRouter = require('./userRouter');

// Entry points.
mainRouter.use('/service', serviceRouter);
mainRouter.use('/turno', turnoRouter);
mainRouter.use('/user', userRouter);

module.exports = mainRouter