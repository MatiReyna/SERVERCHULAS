const { Router } = require('express');
const { postUser } = require('../handlers/userHandler');
const userRouter = Router();

userRouter.post('/', postUser);

module.exports = userRouter