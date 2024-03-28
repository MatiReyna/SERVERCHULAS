const { Op } = require('sequelize');
const { turno } = require('../DB_connection');

const createTurno = async (day, timetable) => {

    const turnoExist = await turno.findOne({
        where: {
            timetable: timetable
        }
    });  // Preguntamos si en la base de datos ya hay un turno con ese horario.

    if (turnoExist) {  // Si lo hay, respondemos que el turno ya existe.
        return {
            status: false,
            message: 'Turno already exists',
            data: []
        }
    } else {  // Caso contrario, lo creamos en la base de datos.
        await turno.create({
            day,
            timetable
        })
    }

    const { data } = await allTurnos();  // Ejecutamos el controllador que me trae a todos los turnos.

    return {
        status: true,
        message: 'The turno was successfully created',
        data
    }
};

const allTurnos = async () => {

    const dataTurno = await turno.findAll();

    const formatteData = {
        status: true,
        message: 'List of turns',
        data: dataTurno.map((turno) => ({
            id: turno.id,
            day: turno.day,
            timetable: turno.timetable,
            states: turno.states
        }))
    }
    return formatteData
};

const turnoByDay = async (day) => {

    // Buscamos los turnos en la base de datos.
    const turnoFind = await turno.findAll({
        where: {
            day: day
        }
    });

    if (turnoFind.length) {
        return {
            status: true,
            message: `Shifts found for the day: ${day}`,
            data: turnoFind
        }
    } else {
        return {
            status: false,
            message: `No shifts created for the day: ${day}`,
            data: []
        }
    }
};

const turnoByTimetable = async (timetable) => {

    const turnoFind = await turno.findOne({ where: { timetable } });

    if (turnoFind) {
        return {
            status: true,
            message: `Turno with timetable: ${timetable} was found`,
            data: [
                {
                    id: turnoFind.id,
                    day: turnoFind.day,
                    timetable: turnoFind.timetable,
                    states: turnoFind.states
                }
            ]
        }
    } else {
        return {
            state: false,
            message: `Turno with timetable: ${timetable} does not in the database`,
            data: []
        }
    }
};

module.exports = {
    createTurno,
    allTurnos,
    turnoByDay,
    turnoByTimetable
}