const { Router } = require('express');
const { postUser, getUserByName, getUserById, userDelete, putUser } = require('../handlers/userHandler');
const userRouter = Router();

userRouter.post('/', postUser);  // Ok, funciona correctamente.
userRouter.get('/', getUserByName);  // Ok, funciona correctamente.
userRouter.get('/:id', getUserById);  // Ok, funciona correctamente.
userRouter.delete('/:id', userDelete);  // Ok, funciona correctamente.
userRouter.put('/', putUser);

module.exports = userRouter