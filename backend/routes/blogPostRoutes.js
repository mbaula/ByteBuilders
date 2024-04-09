import express from 'express';
<<<<<<< HEAD
import { createPost, getPostById, getPostsByCategoryId, updatePostById, deletePostById } from '../controllers/BlogPostController.js';
import authenticateToken from '../middleware/authenticateToken.js'

const router = express.Router();

router.post('/', authenticateToken, createPost);
=======
import { createPost, getPostById, updatePostById, deletePostById, getPosts } from '../controllers/BlogPostController.js';



const router = express.Router();

router.post('/create', createPost);
>>>>>>> fac035a (Routing, and Feed Fix)

router.get('/:id', authenticateToken, getPostById);

<<<<<<< HEAD
router.get('/category/:categoryId', authenticateToken, getPostsByCategoryId);
=======
router.get('/', (req, res) =>{
    getPosts(req,res);
});

router.put('/:id', updatePostById);
>>>>>>> fac035a (Routing, and Feed Fix)

router.put('/:id', authenticateToken, updatePostById);

router.delete('/:id', authenticateToken, deletePostById);

export default router;