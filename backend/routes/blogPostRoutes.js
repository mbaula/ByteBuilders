import express from 'express';
import { createPost, getPostById, updatePostById, deletePostById } from '../controllers/BlogPostController.js';

const router = express.Router();

router.post('/', createPost);

router.get('/:id', getPostById);

router.put('/:id', updatePostById);

router.delete('/:id', deletePostById);

export default router;
