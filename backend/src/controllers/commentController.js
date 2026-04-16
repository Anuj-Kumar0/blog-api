import { prisma } from "../../lib/prisma.js"

export const getCommentsByPost = async (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: true },
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const createComment = async (req, res) => {
    const postId = parseInt(req.params.id);
    const { content } = req.body;
  
    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          postId,
          userId: req.user.id,
        },
      });
  
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ error: "Error creating comment" });
    }
  };

  export const deleteComment = async (req, res) => {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
  
    try {
      const comment = await prisma.comment.findUnique({
        where: { id },
      });
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      if (comment.userId !== userId && req.user.role !== "admin") {
        return res.status(403).json({ error: "Not authorized" });
      }
  
      await prisma.comment.delete({
        where: { id },
      });
  
      res.json({ message: "Comment deleted" });
    } catch (err) {
      res.status(500).json({ error: "Error deleting comment" });
    }
  };