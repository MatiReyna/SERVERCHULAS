const { user } = require('../DB_connection');

const createUser = async (name, email, password, phone) => {
    const upperCaseName = name.toUpperCase();  // Convertimos el nombre a mayúscula.
    let level = 'STANDAR';

    // Verificamos que el email sea el de administrador y le asignamos ese valor.
    if (email === 'lencinasm48@gmail.com' || email === 'matiireyna@hotmail.com') {
        level = 'ADMIN'
    }

    const userExist = await user.findOne({ where: { email: email } });

    if (userExist) {
        return {
            status: false,
            message: `The user whith email: ${email} already exists`,
            data: []
        }
    } else {
        await user.create({
            name: upperCaseName,
            email,
            password,
            phone,
            level: level
        })
    }

    const { data } = await allUsers();

    return {
        status: true,
        message: 'The user was successfully created',
        data
    }
};

const allUsers = async () => {

    const dataUser = await user.findAll();

    const formatteData = {
        status: true,
        message: 'List of users',
        data: dataUser.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            activeLogin: user.activeLogin,
            level: user.level
        }))
    }
    return formatteData
};

module.exports = {
    createUser,
    allUsers
}