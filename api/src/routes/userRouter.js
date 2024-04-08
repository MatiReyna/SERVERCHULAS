const { Router } = require('express');
const { postUser, getUserByName, getUserById } = require('../handlers/userHandler');
const userRouter = Router();

userRouter.post('/', postUser);  // Ok, funciona correctamente.
userRouter.get('/', getUserByName);  // Ok, funciona correctamente.
userRouter.get('/:id', getUserById);

module.exports = userRouter