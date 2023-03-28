import express from 'express';
import { createUser, updateUser, deleteUser,login } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/signin', createUser);
router.put('/Users/:id', updateUser);
router.delete('/Users/:id', deleteUser);
router.post('/Users/login', login);

export default router;
