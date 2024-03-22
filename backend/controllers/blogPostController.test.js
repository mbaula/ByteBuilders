import request from 'supertest';
import mongoose from 'mongoose';
import app from '../express.js'; 
import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';

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
    await BlogPost.deleteMany({});
    await User.deleteMany({});
});

describe('BlogPost Controller', () => {
    let authorId;

    beforeEach(async () => {
        const author = new User({
            username: 'authorUser',
            email: 'author@example.com',
            passwordHash: 'authorPasswordHash',
            profile: { bio: 'Author bio' },
        });
        const savedAuthor = await author.save();
        authorId = savedAuthor._id;
    });

    it('should create a new blog post', async () => {
        const newPost = {
            title: 'New Blog Post',
            content: 'Content of the new blog post',
            author: authorId,
            categories: [],
        };

        const response = await request(app)
            .post('/api/blogposts')
            .send(newPost);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newPost.title);
        expect(response.body.content).toBe(newPost.content);
        expect(response.body.author.toString()).toBe(authorId.toString());
    });

    it('should retrieve a blog post by ID', async () => {
        const post = new BlogPost({
            title: 'Existing Blog Post',
            content: 'Content of the existing blog post',
            author: authorId,
            categories: [],
        });
        const savedPost = await post.save();

        const response = await request(app)
            .get(`/api/blogposts/${savedPost._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id.toString()).toBe(savedPost._id.toString());
        expect(response.body.title).toBe(savedPost.title);
    });

    it('should update a blog post by ID', async () => {
        const post = new BlogPost({
            title: 'Original Blog Post',
            content: 'Original content of the blog post',
            author: authorId,
            categories: [],
        });
        const savedPost = await post.save();
    
        const updatedData = {
            title: 'Updated Blog Post',
            content: 'Updated content of the blog post',
        };
    
        const response = await request(app)
            .put(`/api/blogposts/${savedPost._id}`)
            .send(updatedData);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedData.title);
        expect(response.body.content).toBe(updatedData.content);
    
        const updatedPost = await BlogPost.findById(savedPost._id);
        expect(updatedPost.title).toBe(updatedData.title);
        expect(updatedPost.content).toBe(updatedData.content);
    });
    
    it('should delete a blog post by ID', async () => {
        const post = new BlogPost({
            title: 'Blog Post to Delete',
            content: 'Content of the blog post to delete',
            author: authorId,
            categories: [],
        });
        const savedPost = await post.save();
    
        const response = await request(app)
            .delete(`/api/blogposts/${savedPost._id}`);
    
        expect(response.statusCode).toBe(204); // No Content
    
        const deletedPost = await BlogPost.findById(savedPost._id);
        expect(deletedPost).toBeNull();
    });
});
