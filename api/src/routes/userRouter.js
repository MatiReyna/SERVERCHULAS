const { Router } = require('express');
const { postUser, getUserByName } = require('../handlers/userHandler');
const userRouter = Router();

userRouter.post('/', postUser);  // Ok, funciona correctamente.
userRouter.get('/', getUserByName);  // Ok, funciona correctamente.

module.exports = userRouter