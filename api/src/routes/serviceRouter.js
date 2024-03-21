const { Router } = require('express');
const { postService } = require('../handlers/serviceHandler');
const serviceRouter = Router();

serviceRouter.post('/', postService);  // Ok, funciona correctamente.

module.exports = serviceRouter