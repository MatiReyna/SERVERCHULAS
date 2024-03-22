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

    const { data } = await allServices();  // Me traigo todos los servicios ya creados en la base de datos.

    return {  // Respondo que se creo con una lista de todos los servicios hasta el momento.
        status: true,
        message: `The ${upperCaseName} service was successfully created`,
        data
    }
};

const allServices = async () => {

    const dataService = await servicio.findAll();  // Nos traemos todos los servicios de la base de datos.

    const formatteData = {
        status: true,
        message: 'List of services',
        data: dataService.map((service) => ({
            id: service.id,
            name: service.name,
            price: service.price
        }))
    }
    return formatteData
};

const serviceByName = async (name) => {
    const upperCaseName = name.toUpperCase();  // Convertimos el nombre a mayúscula.

    // Buscamos el servicio en la base de datos.
    const serviceFind = await servicio.findAll({
        where: {
            name: {
                [Op.iLike]: `%${upperCaseName}%`,
            }
        }
    });

    if (serviceFind.length) {  // Si tiene largo, quiere decir que encontro el service.
        return {
            status: true,
            message: `${upperCaseName} service found`,
            data: serviceFind
        }
    } else {  // Caso contrario, no se encontro el servicio en la base de datos.
        return {
            status: false,
            message: `The ${upperCaseName} service is not created`,
            data: []
        }
    }
};

const serviceById = async (id) => {

    const idService = await servicio.findOne({ where: { id } });  // En esta variable me traigo el servicio con el id solicitado.

    if (idService) {
        return {
            status: true,
            message: `Service with ID: ${id} was found`,
            data: [
                {
                    id: idService.id,
                    name: idService.name,
                    price: idService.price
                }
            ]
        }
    } else {
        return {
            status: false,
            message: `Service with ID: ${id} does not exist in the database`,
            data: []
        }
    }
};

module.exports = {
    createService,
    allServices,
    serviceByName,
    serviceById
}