const { turno } = require('../DB_connection');

const createTurno = async (day, timetable) => {

    const turnoExist = await turno.findOne({
        where: {
            timetable: timetable
        }
    });

    if (turnoExist) {
        return {
            status: false,
            message: 'Turno already exists',
            data: []
        }
    } else {
        await turno.create({
            day,
            timetable
        })
    }

    // const { data } = await allTurnos();

    return {
        status: true,
        message: 'The turno was successfully created'
    }
};

module.exports = {
    createTurno
}