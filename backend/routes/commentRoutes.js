import express from "express";
import {
  createComment,
  deleteCommentById,
  getCommentById,
  updateCommentById,
} from "../controllers/CommentController.js";

const router = express.Router();

router.post("/", createComment);

router.get("/:id", getCommentById);

router.put("/:id", updateCommentById);

router.delete("/:id", deleteCommentById);

export default router;
