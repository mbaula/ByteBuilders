import BlogPost from '../models/BlogPost.js'; 

export const createPost = async (req, res) => {
    try {
        const { title, content, categories } = req.body;
        const author = req.user._id;
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
                            .populate('comments') 
                            .exec();
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        let postObject = post.toObject();

        postObject.isEditable = req.user && post.author._id.toString() === req.user._id.toString();
        postObject.isDeletable = postObject.isEditable; 

        res.status(200).json(postObject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPostsByCategoryId = async (req, res) => {
    try {
      const { categoryId } = req.params; 
  
      const posts = await BlogPost.find({ categories: categoryId })
        .populate('author', 'username') 
        .populate('categories', 'name') 
        .exec();
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export const updatePostById = async (req, res) => {
    try {
        const update = { ...req.body, isEdited: true };
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, update, { new: true });
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