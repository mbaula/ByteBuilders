import express from 'express';
import {createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById} from '../controllers/CategoryController.js';
import authenticateToken from '../middleware/authenticateToken.js'

const router = express.Router();

router.get('/', getAllCategories);

router.post('/', authenticateToken, createCategory);

router.get('/:id', getCategoryById);

router.put('/:id', updateCategoryById);

router.delete('/:id', deleteCategoryById);

router.get("/filter", getCategoriesByName);

export default router;