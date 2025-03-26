import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//import { body, validationResult } from "express-validator";

const router = express.Router();

// ✅ Register User
router.post("/signup", async (req, res) => {
  try {
    console.log("🔹 Register Request Body:", req.body);

    // Ensure all fields are present
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ error: "User already exists!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const newUser = new User({ 
      username: req.body.username, 
      email: req.body.email, 
      password: hashedPassword 
    });

    await newUser.save();
    console.log("✅ User Created:", newUser);
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error("🔥 Error in Registration:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Login Route (Issue Token)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 FIX: Ensure `userId` is included in the token
    const token = jwt.sign(
      { userId: user._id.toString() }, // 👈 Ensure userId is added
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Generated Token Payload:", jwt.decode(token)); // 🔥 Debugging line
    
    res.json({ 
      token,
      user: { _id: user._id, username: user.username, email: user.email }
     });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
