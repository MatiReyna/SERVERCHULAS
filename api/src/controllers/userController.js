const { user } = require('../DB_connection');

const createUser = async (name, email, password, phone) => {

    const userExist = await user.findOne({ where: { email: email } });

    if (userExist) {
        return {
            status: false,
            message: 'User already exists',
            data: []
        }
    } else {
        await user.create({
            name,
            email,
            password,
            phone
        })
    }

    return {
        status: true,
        message: 'The user was successfully created'
    }
};

module.exports = {
    createUser
}