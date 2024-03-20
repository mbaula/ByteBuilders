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
});
