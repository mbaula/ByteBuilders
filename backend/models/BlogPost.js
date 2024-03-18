import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Blog post title is required'
    },
    content: {
        type: String,
        required: 'Blog post content is required'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Author is required'
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    publishDate: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('BlogPost', blogPostSchema);
