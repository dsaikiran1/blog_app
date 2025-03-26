import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function LoginPage({ setIsLoggedIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setIsLoggedIn(true);
      setUser(data.user);
      navigate("/user");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#1a1a2e",
        overflow: "hidden", // Prevents extra scrolling
      }}
    >
      <div
        className="p-4 rounded bg-dark text-white shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 className="text-center fw-bold mb-4">Let's go.</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        <Form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              className="form-control bg-secondary text-white border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-control bg-secondary text-white border-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 rounded-pill" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="mb-1">Don't have an account?</p>
          <Button
            variant="outline-light"
            className="w-100 rounded-pill"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
