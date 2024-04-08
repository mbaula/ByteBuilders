import express from 'express';
import { createPost, getPostById, updatePostById, deletePostById } from '../controllers/BlogPostController.js';
import authenticateToken from '../middleware/authenticateToken.js'

const router = express.Router();

router.post('/', authenticateToken, createPost);

router.get('/:id', getPostById);

router.put('/:id', updatePostById);

router.delete('/:id', deletePostById);

export default router;
