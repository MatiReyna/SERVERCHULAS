const { createTurno, allTurnos, turnoByDay, turnoByTimetable, deleteTurno, upGradeTurno } = require('../controllers/turnoController');

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

const getTurnoByTimetable = async (request, response) => {
    const { timetable } = request.params;
    try {
        const turnoTimetable = await turnoByTimetable(timetable);
        response.status(200).json(turnoTimetable);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

const turnoDelete = async (request, response) => {
    const { day, timetable } = request.params;
    try {
        const deleted = await deleteTurno(day, timetable);
        response.status(200).json(deleted);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

const putTurno = async (request, response) => {
    const { day, timetable } = request.body;
    try {
        const upGrade = await upGradeTurno(day, timetable);
        response.status(200).json(upGrade);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {
    postTurno,
    getTurnoByDay,
    getTurnoByTimetable,
    turnoDelete,
    putTurno
}