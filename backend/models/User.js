import mongoose from 'mongoose';
import crypto from 'crypto';

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
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        unique: true
    },
    passwordHash: {
        type: String,
        required: 'Password is required'
    },
    salt: String,
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

userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.passwordHash = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.passwordHash;
    },
    encryptPassword: function(password) {
        if (!password) return '';
        try {
        return crypto
            .createHmac('sha256', this.salt)
            .update(password)
            .digest('hex');
        } catch (err) {
        return '';
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },
};

export default mongoose.model('User', userSchema);
