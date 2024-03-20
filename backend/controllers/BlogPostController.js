import BlogPost from '../models/BlogPost.js'; 

export const createPost = async (req, res) => {
    try {
        const { title, content, author, categories } = req.body;
        const newPost = new BlogPost({ title, content, author, categories });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePostById = async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePostById = async (req, res) => {
    try {
        const result = await BlogPost.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};