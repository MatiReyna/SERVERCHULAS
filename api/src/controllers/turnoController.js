const { Op } = require('sequelize');
const { turno } = require('../DB_connection');

const createTurno = async (day, timetable) => {

    const turnoExist = await turno.findOne({
        where: {
            day: day,
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
    const turnoFind = await turno.findAll({ where: { day: day } });

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

    const turnoFound = await turno.findAll({ where: { timetable } });

    if (turnoFound.length) {
        return {
            status: true,
            message: `Turno with timetable: ${timetable} was found`,
            data: turnoFound
        }
    } else {
        return {
            status: false,
            message: `Turno with timetable: ${timetable} does not in the database`,
            data: []
        }
    }
};

const deleteTurno = async (day, timetable) => {

    const turnoExist = await turno.findOne({
        where: {
            day: day,
            timetable: timetable
        }
    });

    if (!turnoExist) {
        return {
            status: false,
            message: `The shift ${day} at ${timetable} does not exist`,
            data: []
        }
    }

    const deleted = await turno.destroy({
        where: {
            day: day,
            timetable: timetable
        }
    })
    
    if (deleted) {
        return {
            status: true,
            message: `The shift ${day} at ${timetable} deleted successfully`
        }
    }
};

const upGradeTurno = async (id, day, timetable) => {

    const turnoExist = await turno.findOne({ where: { id } });  // Buscamos el turno por id en la base de datos.

    if (!turnoExist) {
        return {
            status: false,
            message: `There is no shift with ID: ${id} to update`,
            data: []
        }
    } 

    const busyTurno = await turno.findOne({
        where: {
            day: day,
            timetable: timetable,
            id: {
                [Op.ne]: id
            }
        }
    });

    if (busyTurno) {
        return {
            status: false,
            message: `The ${timetable} for the dat ${day} is already taken up by another shift`,
            data: []
        }
    }
    
    turnoExist.day = day;
    turnoExist.timetable = timetable;
    await turnoExist.save();

    const { data } = await allTurnos();

    return {
        status: true,
        message: `Correctly updated the shift of the day ${day}`,
        data
    }

};

module.exports = {
    createTurno,
    allTurnos,
    turnoByDay,
    turnoByTimetable,
    deleteTurno,
    upGradeTurno
}