import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
// Middleware
//app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);



if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res) => {
       res.sendFile(path.resolve(__dirname,"frontend","dist","index.html")); 
    })
}


// Connect to MongoDB
const connectDB = async () => {
  try {
      const connection = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
  }
};

app.listen(PORT, () => {
    connectDB();

    console.log("Server running on port on: http://localhost:"+PORT)
});
