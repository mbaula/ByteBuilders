import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './Category.js'; 

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Category model', () => {
    afterEach(async () => {
        await Category.deleteMany({});
    });

    it('should create and save a category successfully', async () => {
        const categoryData = {
            name: 'Technology',
            description: 'Posts related to technology topics',
        };
        const category = new Category(categoryData);
        const savedCategory = await category.save();

        expect(savedCategory._id).toBeDefined();
        expect(savedCategory.name).toBe(categoryData.name);
        expect(savedCategory.description).toBe(categoryData.description);
    });

    it('should enforce uniqueness of category name', async () => {
        const categoryName = 'UniqueCategory';
        const category1 = new Category({ name: categoryName });
        await category1.save();

        const category2 = new Category({ name: categoryName });

        await expect(category2.save()).rejects.toThrow();
    });
});
