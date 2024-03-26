const { Router } = require('express');
const { postTurno } = require('../handlers/turnoHandler');
const turnoRouter = Router();

turnoRouter.post('/', postTurno);  // Ok, funciona correctamente.

module.exports = turnoRouter