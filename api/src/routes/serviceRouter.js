const { Router } = require('express');
const { postService, getServiceByName, getServiceById } = require('../handlers/serviceHandler');
const serviceRouter = Router();

serviceRouter.post('/', postService);  // Ok, funciona correctamente.
serviceRouter.get('/', getServiceByName);  // Ok, funciona correctamente.
serviceRouter.get('/:id', getServiceById);

module.exports = serviceRouter