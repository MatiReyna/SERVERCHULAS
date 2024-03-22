const { createService, allServices, serviceByName, serviceById } = require('../controllers/serviceController');

const postService = async (request, response) => {
    const { name, price } = request.body;
    try {
        const data = await createService(name, price);
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

const getServiceByName = async (request, response) => {
    const { name } = request.query;
    try {
        if (name) {
            const serviceName = await serviceByName(name);
            response.status(200).json(serviceName);
        } else {
            const data = await allServices();
            response.status(200).json(data);
        }
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

const getServiceById = async (request, response) => {
    const { id } = request.params;
    try {
        const serviceId = await serviceById(id);
        response.status(200).json(serviceId);
    } catch (error) {
        response.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {
    postService,
    getServiceByName,
    getServiceById
}