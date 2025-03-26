export default function CreatePage() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    color: '#333',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
  };

  const submitBtnStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1.1rem',
    marginTop: '1rem',
  };

  const submitBtnHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Create Blog</h2>
        <form>
          <div style={formGroupStyle}>
            <label>Title:</label>
            <br />
            <input type="text" style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label>Content:</label>
            <br />
            <textarea rows="6" style={textareaStyle}></textarea>
          </div>
          <button
            type="submit"
            style={submitBtnStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = submitBtnHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}
