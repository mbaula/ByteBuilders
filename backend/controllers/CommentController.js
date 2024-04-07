import Comment from "../models/Comment.js";
import BlogPost from "../models/BlogPost.js";

export const createComment = async (req, res) => {
  try {
    const { content, post } = req.body;
    const author = req.user._id;
    const newComment = new Comment({ content, post, author });

    const savedComment = await newComment.save();

    await BlogPost.findByIdAndUpdate(post, { $push: { comments: savedComment._id } });

    const populatedComment = await Comment.findById(savedComment._id).populate('author', 'username');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).populate('author', '_id username');
    const commentsWithDeletableFlag = comments.map(comment => ({
      ...comment.toObject(),
      isDeletable: comment.author._id.toString() === req.user._id.toString(),
    }));
    res.status(200).json(commentsWithDeletableFlag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCommentById = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await Comment.findByIdAndDelete(req.params.id);
    await BlogPost.findByIdAndUpdate(comment.post, {
      $pull: { comments: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteCommentById:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
};
