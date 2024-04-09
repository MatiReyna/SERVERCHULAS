const { createUser, allUsers, userByName, userById, deleteUser } = require('../controllers/userController');

const postUser = async (request, response) => {
    const { name, email, password, phone } = request.body;
    try {
        const data = await createUser(name, email, password, phone);
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

const getUserByName = async (request, response) => {
    const { name } = request.query;
    try {
        if (name) {
            const userName = await userByName(name);
            response.status(200).json(userName);
        } else {
            const data = await allUsers();
            response.status(200).json(data);
        }
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

const getUserById = async (request, response) => {
    const { id } = request.params;
    try {
        const userId = await userById(id);
        response.status(200).json(userId);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

const userDelete = async (request, response) => {
    const { id } = request.params;
    try {
        const deleted = await deleteUser(id);
        response.status(200).json(deleted); 
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {
    postUser,
    getUserByName,
    getUserById,
    userDelete
}