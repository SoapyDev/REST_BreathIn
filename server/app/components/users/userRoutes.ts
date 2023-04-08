import express from 'express';
import controller from './users.controller.js';

const userRouter = express.Router();
const {createUser, updateUser, deleteUser, login,isLoggedIn, logout} = controller

userRouter.post('/signin', createUser);
userRouter.put('/Users/:id', updateUser);
userRouter.delete('/Users/:id', deleteUser);
userRouter.post('/Users/login', login);
userRouter.post(`/Users/isLoggedIn`, isLoggedIn)
userRouter.delete("/Users/disconnect/:token", logout);

export default userRouter;
