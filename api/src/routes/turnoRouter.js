const { Router } = require('express');
const { postTurno, getTurnoByDay } = require('../handlers/turnoHandler');
const turnoRouter = Router();

turnoRouter.post('/', postTurno);  // Ok, funciona correctamente.
turnoRouter.get('/', getTurnoByDay);  // Ok, funciona correctamente.

module.exports = turnoRouter