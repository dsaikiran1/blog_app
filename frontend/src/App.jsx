import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import UserPage from "./pages/UserPage"; // ✅ Ensure correct import

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // ✅ Check if `storedUser` exists before parsing
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user"); // Remove corrupted data
      }
    }
  }, []);

  return (
    <BrowserRouter>
      {/* ✅ Pass authentication state to Navbar */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />
      <div className="page-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />

        {/* ✅ Protected Route for User Dashboard */}
        <Route 
          path="/user" 
          element={isLoggedIn ? <UserPage user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
      </div>
    </BrowserRouter>
  );
}
