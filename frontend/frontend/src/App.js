import React, { useState } from "react";
import "./App.css";
import api from "./api";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadPDF = async () => {
    if (!selectedFile) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);

      await api.post("/upload", formData);

      setUploaded(true);

      alert("PDF uploaded successfully!");

    } catch (error) {

      console.log(error);

      alert("Upload failed.");

    } finally {

      setLoading(false);

    }
  };

  const askQuestion = async () => {

    if (!uploaded) {

      alert("Upload a PDF first.");

      return;

    }

    if (question.trim() === "") {

      return;

    }

    try {

      setLoading(true);

      const response = await api.post("/ask", {
        question: question
      });

      setAnswer(response.data.answer);

      setPage(response.data.page);

    } catch (error) {

      console.log(error);

      alert("Failed to get answer.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="app">

      <div className="container">

        <h1>⚖ Legal AI Assistant</h1>

        <p className="subtitle">

          Upload a legal PDF and ask questions using AI.

        </p>

        <div className="card">

          <h2>Upload PDF</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <button onClick={uploadPDF}>

            Upload

          </button>

        </div>

        <div className="card">

          <h2>Ask a Question</h2>

          <textarea
            placeholder="Example: What is the termination clause?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button onClick={askQuestion}>

            Ask AI

          </button>

        </div>

        {loading && (

          <div className="loading">

            AI is thinking...

          </div>

        )}

        {answer && (

          <div className="answer-card">

            <h2>Answer</h2>

            <p>{answer}</p>

            <div className="page">

              Source Page: {page}

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default App;