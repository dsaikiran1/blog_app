import express from "express";
import { body, validationResult } from "express-validator";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Blog (Only for authenticated users)
router.post("/create",
  [
    authMiddleware,
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const userId = req.user.userId;
    const username = req.user.username;

    try {
      console.log("Request received:", req.body); // Debugging line
      const blog = new Blog({ title, content, author: req.user.userId , authorUsername: username});
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      console.error("Error creating blog:", error); // Debugging line
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all blogs (Public)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single blog (Public)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all blogs created by the logged-in user (Protected Route)
router.get("/user/blogs", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ Extract user ID from the token
    console.log("🔹 Fetching blogs for user ID:", userId); // 🔍 Debugging log

    // ✅ Find all blogs where the author matches the logged-in user
    const blogs = await Blog.find({ author: userId }).populate("author", "name email");

    console.log("✅ Blogs Found:", blogs); // 🔍 Debugging log
    res.json(blogs);
  } catch (error) {
    console.error("🔥 Error fetching user blogs:", error); // 🔍 Debugging log
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update a blog (Only author can update)
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a blog (Only author can delete)
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
