import { prisma } from "../../lib/prisma.js"

export const getAllPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        where: { isPublished: true },
        include: {
          author: true,
        },
      });
  
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  };

  export const getAllPostsForAdmin = async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: true,
        },
      });
  
      res.json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  };

  export const getPostById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
};
  
export const createPost = async (req, res) => {
    const { title, content, isPublished } = req.body;
  
    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          isPublished,
          authorId: req.user.id,
        },
      });
  
      res.status(201).json(post);
    } catch (err) {
        console.log(err);
      res.status(500).json({ error: "Error creating post" });
    }
  };
  
  export const updatePost = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content, isPublished } = req.body;
  
    try {
      const post = await prisma.post.update({
        where: { id },
        data: {
          title,
          content,
          isPublished,
        },
      });
  
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: "Error updating post" });
    }
  };
  
  export const deletePost = async (req, res) => {
    const id = parseInt(req.params.id);
  
    try {
      await prisma.post.delete({
        where: { id },
      });
  
      res.json({ message: "Post deleted" });
    } catch (err) {
      res.status(500).json({ error: "Error deleting post" });
    }
  };