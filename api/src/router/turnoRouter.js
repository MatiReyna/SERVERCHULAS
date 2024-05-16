const { Router } = require('express');
const { postTurno, getTurnoByDay, getTurnoByTimetable, turnoDelete, putTurno, putTurnoStates } = require('../handlers/turnoHandler');
const turnoRouter = Router();

turnoRouter.post('/', postTurno);  // Ok, funciona correctamente.
turnoRouter.get('/', getTurnoByDay);  // Ok, funciona correctamente.
turnoRouter.get('/:timetable', getTurnoByTimetable);  // Ok, funciona correctamente.
turnoRouter.delete('/:day/:timetable', turnoDelete);  // Ok, funciona correctamente.
turnoRouter.put('/', putTurno)  // Ok, funciona correctamente.
turnoRouter.put('/', putTurnoStates)  // Ok, funciona correctamente.

module.exports = turnoRouter