import express from 'express';
import { createUser, updateUser, deleteUser, login, isLoggedIn, logout } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/signin', createUser);
router.put('/Users/:id', updateUser);
router.delete('/Users/:id', deleteUser);
router.post('/Users/login', login);
router.post('/Users/isLoggedIn', isLoggedIn)
router.delete("/Users/disconnect/:token", logout);

export default router;
