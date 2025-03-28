import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SignupPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", formData);
      setMessage(res.data.message);
      setError("");
      setLoading(false);

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
      setMessage("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#1a1a2e",
        overflow: "hidden", // Prevents unwanted scrolling
      }}
    >
      <div
        className="p-4 rounded bg-dark text-white shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 className="text-center fw-bold mb-4">Create Account</h2>

        {message && <p className="text-success text-center">{message}</p>}
        {error && <p className="text-danger text-center">{error}</p>}

        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              className="form-control bg-secondary text-white border-0"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              className="form-control bg-secondary text-white border-0"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-control bg-secondary text-white border-0"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 rounded-pill" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="mb-1">Already have an account?</p>
          <Button variant="outline-light" className="w-100 rounded-pill" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
