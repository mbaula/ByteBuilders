import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './User.js'; 

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
});

afterAll(async () => {
    await User.deleteMany({ email: /@test.com$/ });
    await mongoose.connection.close();
});

describe('User model', () => {
    it('should create and save a user successfully', async () => {
        const userData = {
            username: 'jestTestUser',
            email: 'jest@testuser.com',
            passwordHash: 'hashedPassword123',
            profile: {
                bio: 'A test user for Jest',
                socialLinks: {
                twitter: '@jestTestUser',
                linkedin: 'linkedin.com/in/jestTestUser'
                }
            }
        };
        const validUser = new User(userData);

        const savedUser = await validUser.save();

        // Assertions
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.passwordHash).toBe(userData.passwordHash);
        expect(savedUser.profile.bio).toBe(userData.profile.bio);
        expect(savedUser.profile.socialLinks.twitter).toBe(userData.profile.socialLinks.twitter);
        expect(savedUser.profile.socialLinks.linkedin).toBe(userData.profile.socialLinks.linkedin);

        // Clean up
        await User.findByIdAndDelete(savedUser._id);
    });

    it('should fail if required fields are missing', async () => {
        const userData = { // missing required fields like email, username
            profile: {
                bio: 'Incomplete test user',
            },
        };
        await expect(new User(userData).save()).rejects.toThrow();
    });

    it('should fail if the email is not unique', async () => {
        const userData = {
            username: 'testUserUnique',
            email: 'unique@test.com',
            passwordHash: 'password123',
        };
        
        // Create first user
        await new User(userData).save();
        
        // Attempt to create second user with the same email
        userData.username = 'testUserUnique2';
        await expect(new User(userData).save()).rejects.toThrow();
    });
      
    it('should update user information correctly', async () => {
        const uniqueSuffix = Date.now().toString();
        const user = await new User({
            username: 'updateTest',
            email: `unique${uniqueSuffix}@test.com`,
            passwordHash: 'password123',
        }).save();
        
        const updatedData = { username: 'updatedName' };
        const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, { new: true });
        
        expect(updatedUser.username).toBe(updatedData.username);
    });
});
