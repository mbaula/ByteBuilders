import express from 'express';
import { createPost, getPostById, getPostsByCategoryId, updatePostById, deletePostById } from '../controllers/BlogPostController.js';
import authenticateToken from '../middleware/authenticateToken.js'

const router = express.Router();

router.post('/', authenticateToken, createPost);

router.get('/:id', authenticateToken, getPostById);

router.get('/category/:categoryId', authenticateToken, getPostsByCategoryId);

router.put('/:id', authenticateToken, updatePostById);

router.delete('/:id', authenticateToken, deletePostById);

export default router;
