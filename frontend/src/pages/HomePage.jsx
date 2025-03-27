import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs/");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#1a1a2e",
          color: "#fff",
          overflowX: "hidden",
        }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#1a1a2e",
          color: "#fff",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflowX: "hidden",
        }}
      >
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        color: "#fff",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <Container fluid className="py-4">
        <h2 className="mb-4 text-white text-center" style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Latest Blogs
        </h2>
        <Row className="gx-4 gy-4 justify-content-center">
          {blogs.map((blog) => (
            <Col key={blog._id} lg={4} md={6} sm={12} className="d-flex">
              <Link
                to={`/blog/${blog._id}`}
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <Card
                  className="shadow-sm bg-dark text-white w-100"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    minHeight: "250px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0px 6px 20px rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Card.Body className="p-3 d-flex flex-column">
                    <Badge
                      bg="primary"
                      className="text-uppercase"
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        alignSelf: "start",
                      }}
                    >
                      {blog.category || "Uncategorized"}
                    </Badge>
                    <Card.Title
                      className="mt-2 text-truncate"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#fff",
                        minHeight: "50px",
                      }}
                    >
                      {blog.title}
                    </Card.Title>
                    <Card.Text
                      className="text-truncate"
                      style={{
                        fontSize: "0.95rem",
                        color: "#ddd",
                        minHeight: "60px",
                      }}
                    >
                      {blog.content.length > 80 ? blog.content.substring(0, 80) + "..." : blog.content}
                    </Card.Text>
                    <div className="mt-auto">
                      <Card.Footer className="d-flex align-items-center bg-dark border-top border-secondary p-3">
                        <img
                          src={`https://i.pravatar.cc/40?img=${blog.author._id}` || "https://via.placeholder.com/40"}
                          alt="author"
                          className="rounded-circle me-2"
                          style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                        <div>
                          <h6 className="mb-0 text-truncate" style={{ fontSize: "0.9rem", color: "#fff", maxWidth: "150px" }}>
                            {blog.author.username}
                          </h6>
                          <small style={{ color: "#bbb" }}>
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      </Card.Footer>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
