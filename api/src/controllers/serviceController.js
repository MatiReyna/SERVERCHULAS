const { Op } = require('sequelize');
const { servicio } = require('../DB_connection');

const createService = async (name, price) => {
    const upperCaseName = name.toUpperCase();  // Convertimos el nombre a mayúscula.

    // Nos fijamos si el servicio existe en la base de datos.
    const serviceExist = await servicio.findOne({
        where: {
            name: {
                [Op.iLike]: `%${upperCaseName}%`
            }
        }
    });

    if (serviceExist) {  // Si ya existe el servicio en la DB, respondemos de la siguiente manera.
        return {
            status: false,
            message: `This service already exists under the name: ${serviceExist.name}`,
            data: []
        }
    } else {  // Caso contrario, creamos el servicio en la base de datos.
        await servicio.create({
            name: upperCaseName,
            price
        })
    }

    // const { data } = await allService();

    return {
        status: true,
        message: `The ${upperCaseName} service was successfully created`,
    }
};

module.exports = {
    createService
}