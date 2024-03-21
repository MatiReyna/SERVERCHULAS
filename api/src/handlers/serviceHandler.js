const { createService, serviceByName, allServices } = require('../controllers/serviceController');

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

module.exports = {
    postService,
    getServiceByName
}