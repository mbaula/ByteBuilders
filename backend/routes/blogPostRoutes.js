import express from 'express';
import { createPost, getPostById, updatePostById, deletePostById } from '../controllers/BlogPostController.js';
import authenticateToken from '../middleware/authenticateToken.js'

const router = express.Router();

router.post('/', authenticateToken, createPost);

router.get('/:id', authenticateToken, getPostById);

router.put('/:id', authenticateToken, updatePostById);

router.delete('/:id', authenticateToken, deletePostById);

export default router;
