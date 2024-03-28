const { Router } = require('express');
const { postTurno, getTurnoByDay, getTurnoByTimetable } = require('../handlers/turnoHandler');
const turnoRouter = Router();

turnoRouter.post('/', postTurno);  // Ok, funciona correctamente.
turnoRouter.get('/', getTurnoByDay);  // Ok, funciona correctamente.
turnoRouter.get('/:timetable', getTurnoByTimetable);  // Ok, funciona correctamente.

module.exports = turnoRouter