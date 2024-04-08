import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: 'Comment content is required'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: 'Associated blog post is required'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Comment author is required'
    },
    commentDate: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isEdited: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model('Comment', commentSchema);
