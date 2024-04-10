import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js'
import { createUser, getUserById, updateUserById, deleteUserById, getCurrentUser } from '../controllers/UserController.js';

const router = express.Router();

router.post('/', createUser);

router.get('/current_user', authenticateToken, getCurrentUser);

router.get('/:id', authenticateToken, getUserById);

router.put('/:id', authenticateToken, updateUserById);

router.delete('/:id', authenticateToken, deleteUserById);

export default router;