import express from 'express';
import { createPost, getPostById, updatePostById, deletePostById, getPosts } from '../controllers/BlogPostController.js';



const router = express.Router();

router.post('/create', createPost);

router.get('/:id', getPostById);

router.get('/', (req, res) =>{
    getPosts(req,res);
});

router.put('/:id', updatePostById);

router.delete('/:id', deletePostById);

export default router;