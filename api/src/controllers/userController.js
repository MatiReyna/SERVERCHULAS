const { Op } = require('sequelize');
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

const userByName = async (name) => {
    const upperCaseName = name.toUpperCase();  // Convertimos el nombre a mayúscula.

    const userFind = await user.findAll({
        where: {
            name: {
                [Op.iLike]: `%${upperCaseName}%`, 
            }
        }
    });

    if (userFind.length) {
        return {
            status: true,
            message: `User found: ${upperCaseName}`,
            data: userFind
        }
    } else {
        return {
            status: false,
            message: `User not found: ${upperCaseName}`,
            data: []
        }
    }
};

const userById = async (id) => {

    const idUser = await user.findOne({ where: { id } });

    if (idUser) {
        return {
            status: true,
            message: `User with ID: ${id} was found`,
            data: [
                {
                    id: idUser.id,
                    name: idUser.name,
                    email: idUser.email,
                    phone: idUser.phone,
                    activeLogin: idUser.activeLogin,
                    level: idUser.level
                }
            ]
        }
    } else {
        return {
            status: false,
            message: `User with ID: ${id} does not exist in the database`,
            data: []
        }
    }
};

const deleteUser = async (id) => {

    const userExisting = await user.findOne(
        { where: { id } },
        { attributes: [ 'name' ] }
    );

    if (!userExisting) {
        return {
            status: false,
            message: `User with ID: ${id} does not exist`,
            data: []
        }
    }

    const deleted = await user.destroy({ where: { id } });
    const { data } = await allUsers();

    if (deleted) {
        return {
            status: true,
            message: `User ${userExisting.name} deleted successfully`,
            data
        }
    }
};

module.exports = {
    createUser,
    allUsers,
    userByName,
    userById,
    deleteUser
}