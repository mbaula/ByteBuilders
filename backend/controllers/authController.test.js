import request from 'supertest';
import mongoose from 'mongoose';
import app from '../express.js'; 
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import config from '../config/config.js';

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
    await User.deleteMany({});
});

describe('Auth Controller', () => {
    it('should sign up a new user', async () => {
        const newUser = {
            username: 'testUser',
            email: 'test@example.com',
            password: bcrypt.hashSync('password123', 10),
        };

        const response = await request(app)
            .post('/api/signup')
            .send(newUser);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Successfully signed up!");
    });

    it('should sign in an existing user', async () => {
        const user = new User({
            username: 'testUser',
            email: 'test@example.com',
            passwordHash: bcrypt.hashSync('password123', 10),
        });
        await user.save();

        const response = await request(app)
            .post('/api/signin')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.user.email).toBe('test@example.com');
    });

    it('should sign out a user', async () => {
        const response = await request(app)
            .get('/api/signout');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("signed out");
    });
});
