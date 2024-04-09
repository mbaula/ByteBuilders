import express from 'express';
import { createPost, getPostById, getPostsByCategoryId, updatePostById, deletePostById, getPosts } from '../controllers/BlogPostController.js';
import authenticateToken from '../middleware/authenticateToken.js'

const router = express.Router();

router.post('/', authenticateToken, createPost);

router.post('/create', createPost);

router.post('/create', createPost);

router.get('/:id', authenticateToken, getPostById);

router.get('/category/:categoryId', authenticateToken, getPostsByCategoryId);
router.get('/', (req, res) =>{
    getPosts(req,res);
});

router.get('/', (req, res) =>{
    getPosts(req,res);
});

router.put('/:id', updatePostById);

router.put('/:id', authenticateToken, updatePostById);

router.delete('/:id', authenticateToken, deletePostById);

export default router;