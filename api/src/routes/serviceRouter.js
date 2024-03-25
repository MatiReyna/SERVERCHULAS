const { Router } = require('express');
const { postService, getServiceByName, getServiceById, serviceDelete } = require('../handlers/serviceHandler');
const serviceRouter = Router();

serviceRouter.post('/', postService);  // Ok, funciona correctamente.
serviceRouter.get('/', getServiceByName);  // Ok, funciona correctamente.
serviceRouter.get('/:id', getServiceById);  // Ok, funciona correctamente.
serviceRouter.delete('/:id', serviceDelete); // Ok, funciona correctamente.

module.exports = serviceRouter