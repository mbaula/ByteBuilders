import express from "express";
import {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByPostId,
  updateCommentById
} from "../controllers/CommentController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/", authenticateToken, createComment);

router.get("/byPost/:postId", authenticateToken, getCommentsByPostId);

router.get("/:id", authenticateToken, getCommentById);

router.put("/:id", authenticateToken, updateCommentById);

router.delete("/:id", authenticateToken, deleteCommentById);

export default router;
