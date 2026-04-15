import express from "express";
import {
  getCommentsByPost,
  createComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET comments for a post
router.get("/posts/:id/comments", getCommentsByPost);

// CREATE comment
router.post("/posts/:id/comments", authenticateToken, createComment);

// DELETE comment
router.delete("/comments/:id", authenticateToken, deleteComment);

export default router;