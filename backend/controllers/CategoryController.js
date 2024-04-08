import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCategoryById = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCategoryById = async (req, res) => {
    try {
        const result = await Category.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCategoriesByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate the query parameter
    if (!name) {
      return res
        .status(400)
        .json({ message: "Name parameter is required for filtering" });
    }

    const categories = await Category.find({
      name: { $regex: new RegExp(name, "i") },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};