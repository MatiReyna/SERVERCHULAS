const { createTurno } = require('../controllers/turnoController');

const postTurno = async (request, response) => {
    const { day, timetable } = request.body;
    try {
        const data = await createTurno(day, timetable);
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {
    postTurno
}