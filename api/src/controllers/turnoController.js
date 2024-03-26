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
            timetable: turno.timetable
        }))
    }
    return formatteData
};

module.exports = {
    createTurno,
    allTurnos
}