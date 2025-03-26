import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer Token

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User:", decoded); // 🔥 Debugging line

    req.user = decoded; // 👈 Ensure `req.user.userId` exists

    if (!req.user.userId) {
      return res.status(401).json({ message: "Invalid token structure: userId missing" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
