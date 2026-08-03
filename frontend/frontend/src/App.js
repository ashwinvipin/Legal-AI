import React, { useState } from "react";
import "./App.css";
import api from "./api";
import { jsPDF } from "jspdf";

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

    if (question.trim() === "") return;

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

  // Download PDF
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Legal AI Analysis Report", 20, 20);

    doc.setFontSize(14);
    doc.text("Question:", 20, 40);

    doc.setFontSize(12);
    doc.text(question, 20, 50);

    doc.setFontSize(14);
    doc.text("Answer:", 20, 70);

    const splitAnswer = doc.splitTextToSize(answer, 170);

    doc.setFontSize(12);
    doc.text(splitAnswer, 20, 80);

    const y = 90 + splitAnswer.length * 7;

    doc.setFontSize(14);
    doc.text(`Source Page: ${page}`, 20, y);

    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      20,
      y + 15
    );

    doc.save("Legal_AI_Report.pdf");

  };

  // Copy Answer
  const copyAnswer = () => {

    navigator.clipboard.writeText(answer);

    alert("Answer copied!");

  };

  // Print Report
  const printAnswer = () => {

    const win = window.open("", "", "width=900,height=700");

    win.document.write(`
      <html>
      <head>
      <title>Legal AI Report</title>
      <style>
      body{
        font-family:Arial;
        margin:40px;
      }
      h1{
        color:#2c3e50;
      }
      </style>
      </head>
      <body>

      <h1>Legal AI Analysis Report</h1>

      <h3>Question</h3>

      <p>${question}</p>

      <h3>Answer</h3>

      <p>${answer}</p>

      <h3>Source Page</h3>

      <p>${page}</p>

      </body>
      </html>
    `);

    win.document.close();

    win.print();

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

            <div className="action-buttons">

              <button onClick={copyAnswer}>
                📋 Copy
              </button>

              <button onClick={printAnswer}>
                🖨 Print
              </button>

              <button onClick={downloadPDF}>
                📥 Download PDF
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;