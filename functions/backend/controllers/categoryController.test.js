import request from 'supertest';
import mongoose from 'mongoose';
import app from '../express.js'; 
import Category from '../models/Category.js';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Category.deleteMany({});
});

describe('Category Controller', () => {
    it('should create a new category', async () => {
        const newCategory = {
            name: 'Test Category',
            description: 'A description for the test category',
        };

        const response = await request(app)
            .post('/api/categories')
            .send(newCategory);

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(newCategory.name);
        expect(response.body.description).toBe(newCategory.description);
    });

    it('should retrieve a category by ID', async () => {
        const category = await new Category({
            name: 'Existing Category',
            description: 'Description for existing category',
        }).save();

        const response = await request(app)
            .get(`/api/categories/${category._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id.toString()).toBe(category._id.toString());
        expect(response.body.name).toBe(category.name);
        expect(response.body.description).toBe(category.description);
    });

    it('should update a category by ID', async () => {
        const category = await new Category({
            name: 'Update Category',
            description: 'Description before update',
        }).save();

        const updatedData = {
            name: 'Updated Category',
            description: 'Description after update',
        };

        const response = await request(app)
            .put(`/api/categories/${category._id}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.description).toBe(updatedData.description);
    });

    it('should delete a category by ID', async () => {
        const category = await new Category({
            name: 'Category to Delete',
            description: 'Description for category to delete',
        }).save();

        const response = await request(app)
            .delete(`/api/categories/${category._id}`);

        expect(response.statusCode).toBe(204);

        const deletedCategory = await Category.findById(category._id);
        expect(deletedCategory).toBeNull();
    });
});
