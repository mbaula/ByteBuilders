import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Comment from './Comment.js'; 
import BlogPost from './BlogPost.js'; 
import User from './User.js'; 

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await Comment.deleteMany({});
    await BlogPost.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('Comment model', () => {
    let user;
    let blogPost;

    beforeAll(async () => {
        user = await new User({ username: 'testUser', email: 'test@example.com', passwordHash: 'hashedPassword123' }).save();
        blogPost = await new BlogPost({ title: 'Test Post', content: 'Content for the test post', author: user._id }).save();
    });

    it('should create and save a comment successfully', async () => {
        const commentData = {
            content: 'This is a test comment',
            post: blogPost._id,
            author: user._id,
        };
        const comment = new Comment(commentData);
        const savedComment = await comment.save();

        expect(savedComment._id).toBeDefined();
        expect(savedComment.content).toBe(commentData.content);
        expect(savedComment.post.toString()).toBe(blogPost._id.toString());
        expect(savedComment.author.toString()).toBe(user._id.toString());
    });

    it('should fail if required fields are missing', async () => {
        const commentData = {}; 
        await expect(new Comment(commentData).save()).rejects.toThrow();
    });
});
