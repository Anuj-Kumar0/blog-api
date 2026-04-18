import express from "express";
import {
  getAllPosts,
  getAllPostsForAdmin,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from "../controllers/postController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/admin", authenticateToken, isAdmin, getAllPostsForAdmin);
router.get("/:id", getPostById);
router.post("/", authenticateToken, isAdmin, createPost);
router.put("/:id", authenticateToken, isAdmin, updatePost);
router.delete("/:id", authenticateToken, isAdmin, deletePost);

export default router;