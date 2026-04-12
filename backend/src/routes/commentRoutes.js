import express from "express";
import {
  getCommentsByPost,
  createComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// GET comments for a post
router.get("/posts/:id/comments", getCommentsByPost);

// CREATE comment
router.post("/posts/:id/comments", createComment);

// DELETE comment
router.delete("/comments/:id", deleteComment);

export default router;