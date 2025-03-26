import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Card, Badge, Spinner } from 'react-bootstrap';

export default function BlogDetailPage() {
  const { id } = useParams(); // Retrieve the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the blog details from your API based on the blog ID
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        const data = await response.json();
        setBlog(data); // Assuming the API response returns the full blog data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="light" />
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5 text-light">
        <h2>Error: {error}</h2>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#1a1a2e", // Dark theme
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
        color: "#fff",
      }}
    >
      <Container className="px-3">
        <Card className="shadow-lg border-0 rounded w-100 text-white" style={{ maxWidth: "800px", backgroundColor: "#212529" }}>
          <Card.Body>
            <Badge bg="primary" className="mb-3">
              {blog.category}
            </Badge>
            <Card.Title className="display-4" style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {blog.title}
            </Card.Title>
            <Card.Text style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              {blog.content}
            </Card.Text>
            <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: 0 }}>
              <em>By {blog.author.username} - {new Date(blog.createdAt).toLocaleDateString()}</em>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
