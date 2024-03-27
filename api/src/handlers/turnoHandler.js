const { createTurno, allTurnos, turnoByDay } = require('../controllers/turnoController');

const postTurno = async (request, response) => {
    const { day, timetable } = request.body;
    try {
        const data = await createTurno(day, timetable);
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

const getTurnoByDay = async (request, response) => {
    const { day } = request.query;
    try {
        if (day) {
            const turnoDay = await turnoByDay(day);
            response.status(200).json(turnoDay);
        } else {
            const data = await allTurnos();
            response.status(200).json(data);
        }
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {
    postTurno,
    getTurnoByDay
}