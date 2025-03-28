import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [editContent, setEditContent] = useState("");

  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchUserBlogs(token);
  }, [navigate]);

  const fetchUserBlogs = (token) => {
    fetch("/api/blogs/user/blogs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch(() => setError("Failed to load blogs."));
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!newBlogTitle || !newBlogContent) {
      setError("Both title and content are required.");
      return;
    } 

    fetch("/api/blogs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newBlogTitle, content: newBlogContent }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchUserBlogs(token);
        setNewBlogTitle("");
        setNewBlogContent("");
        setError("");
      })
      .catch(() => setError("Error creating blog."));
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog._id);
    setEditContent(blog.content);
  };

  const handleSaveEdit = (blogId) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/blogs/update/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: editContent }),
    })
      .then((response) => response.json())
      .then(() => {
        setBlogs(blogs.map((blog) => (blog._id === blogId ? { ...blog, content: editContent } : blog)));
        setEditingBlog(null);
      })
      .catch(() => setError("Error updating blog."));
  };

  const handleDelete = (blogId) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/blogs/delete/${blogId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          setBlogs(blogs.filter((blog) => blog._id !== blogId));
        }
      })
      .catch(() => setError("Error deleting blog."));
  };

  if (!user) return <h2 className="text-center text-light mt-5">Loading...</h2>;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#1a1a2e",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        className="p-4 rounded bg-dark text-white shadow-lg"
        style={{
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* User Info Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-light">Welcome, {user.username || "User"}!</h2>
          <p className="text-muted">Email: {user.email}</p>
        </div>

        {/* Create New Blog Section */}
        <h3 className="fw-semibold text-center mb-3 text-light">Create New Blog</h3>
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleCreateBlog} className="mb-4 p-3 bg-secondary rounded shadow-sm">
          <input
            type="text"
            className="form-control mb-2 bg-dark text-white border-0"
            placeholder="Enter blog title"
            value={newBlogTitle}
            onChange={(e) => setNewBlogTitle(e.target.value)}
            required
          />
          <textarea
            className="form-control mb-2 bg-dark text-white border-0"
            placeholder="Write your blog content..."
            value={newBlogContent}
            onChange={(e) => setNewBlogContent(e.target.value)}
            required
            rows="4"
          />
          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            Publish Blog
          </button>
        </form>

        {/* Blogs Section */}
        <h3 className="fw-semibold text-center mb-4 text-light">Your Blogs</h3>

        {blogs.length === 0 ? (
          <p className="text-center text-muted">No blogs available.</p>
        ) : (
          <div className="row">
            {blogs.map((blog) => (
              <div key={blog._id} className="col-12 mb-3">
                <div className="p-3 bg-secondary text-white rounded shadow-sm">
                  <h4 className="fw-bold">{blog.title}</h4>

                  {editingBlog === blog._id ? (
                    <>
                      <textarea
                        className="form-control bg-dark text-white border-0"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows="4"
                      />
                      <div className="d-flex justify-content-end mt-2">
                        <button className="btn btn-success btn-sm me-2 rounded-pill" onClick={() => handleSaveEdit(blog._id)}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm rounded-pill" onClick={() => setEditingBlog(null)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>{blog.content}</p>
                  )}

                  {/* Buttons */}
                  <div className="d-flex justify-content-end mt-2">
                    {editingBlog !== blog._id && (
                      <button className="btn btn-warning btn-sm me-2 rounded-pill" onClick={() => handleEditClick(blog)}>
                        Edit
                      </button>
                    )}
                    <button className="btn btn-danger btn-sm rounded-pill" onClick={() => handleDelete(blog._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
