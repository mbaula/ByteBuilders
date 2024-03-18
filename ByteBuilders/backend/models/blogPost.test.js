import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPost from './BlogPost.js';
import User from './User.js';
import Category from './Category.js'; 

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await User.deleteMany({ email: /@test.com$/ });
    await mongoose.connection.close();
});

describe('BlogPost model', () => {
    let createdUser;
    let createdCategory;

    beforeAll(async () => {
        createdUser = await new User({
            username: 'blogAuthor',
            email: 'author@test.com',
            passwordHash: 'hashedPassword123',
        }).save();

        createdCategory = await new Category({
            name: 'Tech',
            description: 'Technology and Computing',
        }).save();
    });

    afterAll(async () => {
        await User.findByIdAndDelete(createdUser._id);
        await Category.findByIdAndDelete(createdCategory._id);
    });

    it('should create and save a blog post successfully', async () => {
        const blogPostData = {
            title: 'Test Blog Post',
            content: 'This is a test blog post content.',
            author: createdUser._id,
            categories: [createdCategory._id],
        };

        const blogPost = new BlogPost(blogPostData);
        const savedBlogPost = await blogPost.save();

        // Assertions
        expect(savedBlogPost._id).toBeDefined();
        expect(savedBlogPost.title).toBe(blogPostData.title);
        expect(savedBlogPost.content).toBe(blogPostData.content);
        expect(savedBlogPost.author.toString()).toBe(createdUser._id.toString());
        expect(savedBlogPost.categories[0].toString()).toBe(createdCategory._id.toString());
        expect(savedBlogPost.publishDate).toBeDefined();

        // Clean up
        await BlogPost.findByIdAndDelete(savedBlogPost._id);
    });

    it('should enforce required fields', async () => {
        const blogPostData = {
            // Omitting required fields to trigger validation errors
        };

        await expect(new BlogPost(blogPostData).save()).rejects.toThrow();
    });

    it('should update blog post content correctly', async () => {
        const blogPostData = {
            title: `Unique Title ${Date.now()}`,
            content: 'Initial content.',
            author: createdUser._id,
            categories: [createdCategory._id],
        };

        const blogPost = await new BlogPost(blogPostData).save();
        const updatedContent = 'Updated content.';
        await BlogPost.findByIdAndUpdate(blogPost._id, { content: updatedContent }, { new: true });

        const updatedBlogPost = await BlogPost.findById(blogPost._id);
        expect(updatedBlogPost.content).toBe(updatedContent);
    });

});
