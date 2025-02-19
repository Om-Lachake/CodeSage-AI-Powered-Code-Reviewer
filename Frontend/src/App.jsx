import React, { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function reviewCode() {
    if (!code.trim()) {
      setError("Code cannot be empty.");
      return;
    }

    // Or, limit the length:
    if (code.length > 10000) {
      // Example limit
      setError("Code is too long.");
      return;
    }
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      if (response.status !== 200) {
        // Or other relevant status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setReview(response.data);
    } catch (err) {
      setError(`Failed to fetch review: ${err.message}`); // More specific error message
      console.error("Error fetching review:", err);
    } finally {
      setLoading(false);
    }
  }

  const ReviewOutput = ({ review, error }) => {
    if (error) {
      return <div className="error-message">{error}</div>;
    }

    // Wrap Markdown component with Suspense
    return (
      <Suspense fallback={<div>Loading review...</div>}>
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </Suspense>
    );
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="code-editor-container">
          <div className="editor-wrapper">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: "Fira Code, monospace",
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "8px",
                width: "100%",
                overflow: "auto",
              }}
            />
          </div>
          <button
            onClick={reviewCode}
            className={`review-button ${
              loading ? "review-button--loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Reviewing..." : "Review"}
          </button>
        </div>
        <div className="review-output">
          {error && <div className="error-message">{error}</div>}
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </div>
  );
}

export default App;
