const { createUser } = require('../controllers/userController');

const postUser = async (request, response) => {
    const { name, email, password, phone } = request.body;
    try {
        const data = await createUser(name, email, password, phone);
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {
    postUser
}