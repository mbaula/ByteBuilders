import express from 'express';
import {createCategory, getCategoryById, updateCategoryById, deleteCategoryById} from '../controllers/CategoryController.js';

const router = express.Router();

router.post('/', createCategory);

router.get('/:id', getCategoryById);

router.put('/:id', updateCategoryById);

router.delete('/:id', deleteCategoryById);

export default router;