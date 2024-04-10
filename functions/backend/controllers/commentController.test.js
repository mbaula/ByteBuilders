import request from 'supertest';
import mongoose from 'mongoose';
import app from '../express.js'; 
import Comment from '../models/Comment.js';
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
    await Comment.deleteMany({});
    await BlogPost.deleteMany({});
    await User.deleteMany({});
});

describe('Comment Controller', () => {
    let savedUser, savedPost;

    beforeEach(async () => {
        savedUser = await new User({
            username: 'testUser',
            email: 'test@example.com',
            passwordHash: 'hashedPassword123',
        }).save();

        savedPost = await new BlogPost({
            title: 'Test Post',
            content: 'Content of the test post',
            author: savedUser._id,
        }).save();
    });

    it('should create a new comment', async () => {
        const newComment = {
            content: 'This is a comment',
            post: savedPost._id,
            author: savedUser._id,
        };

        const response = await request(app)
            .post('/api/comments')
            .send(newComment);

        expect(response.statusCode).toBe(201);
        expect(response.body.content).toBe(newComment.content);
        expect(response.body.post.toString()).toBe(newComment.post.toString());
        expect(response.body.author.toString()).toBe(newComment.author.toString());
    });

    it('should retrieve a comment by ID', async () => {
        const comment = await new Comment({
            content: 'Existing Comment',
            post: savedPost._id,
            author: savedUser._id,
        }).save();

        const response = await request(app)
            .get(`/api/comments/${comment._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id.toString()).toBe(comment._id.toString());
    });

    it('should update a comment by ID', async () => {
        const comment = await new Comment({
            content: 'Comment to Update',
            post: savedPost._id,
            author: savedUser._id,
        }).save();

        const updatedData = {
            content: 'Updated Comment Content',
        };

        const response = await request(app)
            .put(`/api/comments/${comment._id}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.content).toBe(updatedData.content);
    });

    it('should delete a comment by ID', async () => {
        const comment = await new Comment({
            content: 'Comment to Delete',
            post: savedPost._id,
            author: savedUser._id,
        }).save();

        const response = await request(app)
            .delete(`/api/comments/${comment._id}`);

        expect(response.statusCode).toBe(204);

        const deletedComment = await Comment.findById(comment._id);
        expect(deletedComment).toBeNull();
    }); 
});
