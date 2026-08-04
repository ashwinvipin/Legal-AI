import React, { useState } from "react";
import "./App.css";
import api from "./api";
import { jsPDF } from "jspdf";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [page, setPage] = useState("");

  const uploadPDF = async () => {

    if (!selectedFile) {

      alert("Please choose a PDF.");

      return;

    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

      setLoading(true);

      await api.post("/upload", formData);

      setUploaded(true);

      alert("Document uploaded successfully!");

    } catch (err) {

      console.log(err);

      alert("Upload failed.");

    } finally {

      setLoading(false);

    }

  };

  const askQuestion = async () => {

    if (!uploaded) {

      alert("Please upload a PDF first.");

      return;

    }

    if (!question.trim()) return;

    try {

      setLoading(true);

      const response = await api.post("/ask", {

        question: question

      });

      setAnswer(response.data.answer);

      setPage(response.data.page);

    } catch (err) {

      console.log(err);

      alert("Failed to generate answer.");

    } finally {

      setLoading(false);

    }

  };

  const copyAnswer = () => {

    navigator.clipboard.writeText(answer);

    alert("Copied!");

  };

  const printAnswer = () => {

    const win = window.open("", "", "width=900,height=800");

    win.document.write(`

      <html>

      <head>

      <title>Legal AI Report</title>

      <style>

      body{

      font-family:Arial;

      margin:40px;

      line-height:1.8;

      }

      h1{

      color:#2563eb;

      }

      </style>

      </head>

      <body>

      <h1>Legal AI Analysis Report</h1>

      <hr>

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

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text("Legal AI Analysis Report", 20, 20);

    doc.setFontSize(13);

    doc.text("Question:", 20, 40);

    doc.text(question, 20, 50);

    doc.text("Answer:", 20, 75);

    const lines = doc.splitTextToSize(answer, 170);

    doc.text(lines, 20, 85);

    doc.text(`Source Page : ${page}`, 20, 100 + lines.length * 7);

    doc.text(

      `Generated : ${new Date().toLocaleString()}`,

      20,

      120 + lines.length * 7

    );

    doc.save("Legal_AI_Report.pdf");

  };

  return (

    <div className="app">

      <div className="glass-card">

        <div className="header">

          <div className="logo">

            ⚖

          </div>

          <div>

            <h1>Legal AI Assistant</h1>

            <p>

              AI Powered Legal Document Analysis using RAG & Llama 3.2

            </p>

          </div>

        </div>

        <div className="upload-section">

          <h2>📄 Upload Legal Document</h2>

          <div className="upload-box">

            <input

              type="file"

              accept=".pdf"

              onChange={(e) => setSelectedFile(e.target.files[0])}

            />

            <p>

              Drag & Drop or Browse PDF

            </p>

          </div>

          <button onClick={uploadPDF}>

            Upload Document

          </button>

          {uploaded && (

            <div className="success">

              ✔ Document uploaded successfully

            </div>

          )}

        </div>

        <div className="question-section">

          <h2>

            💬 Ask Your Question

          </h2>

          <textarea

            placeholder="Example: What is the termination clause?"

            value={question}

            onChange={(e) => setQuestion(e.target.value)}

          />

          <button onClick={askQuestion}>

            🔍 Analyze Document

          </button>

        </div>

        {loading && (

          <div className="loading">

            <div className="spinner"></div>

            <p>Analyzing Document...</p>

          </div>

        )}

        {answer && (

          <div className="answer-card">

            <h2>

              🤖 AI Analysis

            </h2>

            <hr />

            <p>{answer}</p>

            <div className="page">

              📑 Source Page : {page}

            </div>

            <div className="buttons">

              <button onClick={copyAnswer}>

                📋 Copy

              </button>

              <button onClick={downloadPDF}>

                📥 PDF

              </button>

              <button onClick={printAnswer}>

                🖨 Print

              </button>

            </div>

          </div>

        )}

        <footer>

          <p>

            Powered by FastAPI • RAG • Llama 3.2 • FAISS • Sentence Transformers

          </p>

        </footer>

      </div>

    </div>

  );

}

export default App;