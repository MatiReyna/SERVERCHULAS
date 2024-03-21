const { Router } = require('express');
const { postService, getServiceByName } = require('../handlers/serviceHandler');
const serviceRouter = Router();

serviceRouter.post('/', postService);  // Ok, funciona correctamente.
serviceRouter.get('/', getServiceByName);  // Ok, funciona correctamente.

module.exports = serviceRouter