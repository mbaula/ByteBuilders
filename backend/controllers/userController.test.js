import request from 'supertest';
import mongoose from 'mongoose';
import app from '../express.js'; 
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
  // Ensure the database is in a clean state before each test
  await User.deleteMany({});
});

describe('User Controller', () => {
  it('should create a new user', async () => {
    const newUser = {
      username: 'testUser',
      email: 'test@example.com',
      passwordHash: 'hashedPassword123',
      profile: { bio: 'Just a test user' },
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.email).toBe(newUser.email);
  });

  it('should retrieve a user by ID', async () => {
    const user = await new User({
      username: 'testUserRetrieve',
      email: 'retrieve@example.com',
      passwordHash: 'hashedPassword123',
      profile: { bio: 'Just a test user for retrieve' },
    }).save();

    const response = await request(app)
      .get(`/api/users/${user._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body._id.toString()).toBe(user._id.toString());
    expect(response.body.username).toBe(user.username);
  });
});
