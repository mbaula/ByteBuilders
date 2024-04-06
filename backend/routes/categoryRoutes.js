import express from 'express';
import {createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById} from '../controllers/CategoryController.js';

const router = express.Router();

router.get('/', getAllCategories);

router.post('/', createCategory);

router.get('/:id', getCategoryById);

router.put('/:id', updateCategoryById);

router.delete('/:id', deleteCategoryById);

export default router;