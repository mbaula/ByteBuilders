import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: 'Username is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true
    },
    passwordHash: {
        type: String,
        required: 'Password hash is required'
    },
    profile: {
        bio: {
            type: String,
            trim: true
        },
        socialLinks: {
            twitter: { type: String, trim: true },
            linkedin: { type: String, trim: true }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('User', userSchema);
