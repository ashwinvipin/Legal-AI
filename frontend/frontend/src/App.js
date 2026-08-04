import React, { useState, useRef } from "react";
import "./App.css";
import api from "./api";
import { jsPDF } from "jspdf";

function App() {

  /* ------------------------------
      States
  ------------------------------ */

  const [selectedFile, setSelectedFile] = useState(null);

  const [uploaded, setUploaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [page, setPage] = useState("");



  /* ------------------------------
      Section References
  ------------------------------ */

  const dashboardRef = useRef(null);

  const documentsRef = useRef(null);

  const assistantRef = useRef(null);

  const reportsRef = useRef(null);

  const settingsRef = useRef(null);



  /* ------------------------------
      Active Sidebar
  ------------------------------ */

  const [activeMenu, setActiveMenu] = useState("dashboard");



  const scrollToSection = (ref, menu) => {

    setActiveMenu(menu);

    ref.current.scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

  };



  /* ------------------------------
      Upload PDF
  ------------------------------ */

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

    }

    catch (err) {

      console.log(err);

      alert("Upload failed.");

    }

    finally {

      setLoading(false);

    }

  };



  /* ------------------------------
      Ask Question
  ------------------------------ */

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

    }

    catch (err) {

      console.log(err);

      alert("Failed to generate answer.");

    }

    finally {

      setLoading(false);

    }

  };



  /* ------------------------------
      Copy
  ------------------------------ */

  const copyAnswer = () => {

    navigator.clipboard.writeText(answer);

    alert("Copied!");

  };



  /* ------------------------------
      Print
  ------------------------------ */

  const printAnswer = () => {

    const win = window.open("", "", "width=900,height=900");

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



  /* ------------------------------
      Download PDF
  ------------------------------ */

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

    <div className="dashboard">

      {/* ===========================
          Sidebar
      =========================== */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-logo">

            ⚖

          </div>

          <div>

            <h2>Legal AI</h2>

            <span>Assistant</span>

          </div>

        </div>

        <nav>

          <ul>

            <li

              className={activeMenu === "dashboard" ? "active" : ""}

              onClick={() =>
                scrollToSection(dashboardRef, "dashboard")
              }

            >

              🏠 Dashboard

            </li>

            <li

              className={activeMenu === "documents" ? "active" : ""}

              onClick={() =>
                scrollToSection(documentsRef, "documents")
              }

            >

              📄 Documents

            </li>

            <li

              className={activeMenu === "assistant" ? "active" : ""}

              onClick={() =>
                scrollToSection(assistantRef, "assistant")
              }

            >

              🤖 AI Assistant

            </li>

            <li

              className={activeMenu === "reports" ? "active" : ""}

              onClick={() =>
                scrollToSection(reportsRef, "reports")
              }

            >

              📊 Reports

            </li>

            <li

              className={activeMenu === "settings" ? "active" : ""}

              onClick={() =>
                scrollToSection(settingsRef, "settings")
              }

            >

              ⚙ Settings

            </li>

          </ul>

        </nav>

      </aside>

      {/* ===========================
          Main Content
      =========================== */}

      <main className="main-content">

        {/* ===========================
            Dashboard
        =========================== */}

        <section

          ref={dashboardRef}

          className="hero"

        >

          <h1>

            ⚖ AI Powered Legal Document Analysis

          </h1>

          <p>

            Upload legal documents, analyze clauses using

            <strong> Retrieval Augmented Generation (RAG)</strong>

            and

            <strong> Llama 3.2</strong>

            to receive intelligent legal insights with

            page references.

          </p>

        </section>

        {/* ===========================
            Statistics
        =========================== */}

        <section className="stats">

          <div className="stat-card">

            <h3>Documents</h3>

            <h2>

              {uploaded ? "1" : "0"}

            </h2>

            <p>Uploaded</p>

          </div>

          <div className="stat-card">

            <h3>Questions</h3>

            <h2>

              {answer ? "1" : "0"}

            </h2>

            <p>Asked</p>

          </div>

          <div className="stat-card">

            <h3>Reports</h3>

            <h2>

              {answer ? "1" : "0"}

            </h2>

            <p>Generated</p>

          </div>

          <div className="stat-card">

            <h3>AI Status</h3>

            <h2>

              Ready

            </h2>

            <p>Online</p>

          </div>

        </section>

        {/* ===========================
            Content Grid
        =========================== */}

        <section className="content-grid">

          <div className="left-panel">

            {/* ===========================
                Documents Section
            =========================== */}

            <section

              ref={documentsRef}

              className="card"

            >

              <h2>

                📄 Upload Document

              </h2>

              <p>

                Upload your legal agreement to begin analysis.

              </p>
                            <div className="upload-box">

                <div className="upload-icon">

                  📂

                </div>

                <p>

                  Drag & Drop PDF Here

                </p>

                <p>

                  or Click to Browse

                </p>

                <input

                  type="file"

                  accept=".pdf"

                  onChange={(e) =>
                    setSelectedFile(e.target.files[0])
                  }

                />

              </div>

              <button

                className="primary-btn"

                onClick={uploadPDF}

              >

                Upload Document

              </button>

              {uploaded && (

                <div className="success-card">

                  ✅ Document uploaded successfully.

                </div>

              )}

            </section>

            {/* ===========================
                AI Assistant
            =========================== */}

            <section

              ref={assistantRef}

              className="card"

            >

              <h2>

                🤖 AI Assistant

              </h2>

              <p>

                Ask questions about the uploaded legal document.

              </p>

              <textarea

                placeholder="Example: What is the termination clause?"

                value={question}

                onChange={(e) =>
                  setQuestion(e.target.value)
                }

              />

              <button

                className="primary-btn"

                onClick={askQuestion}

              >

                🔍 Analyze Document

              </button>

            </section>

          </div>

          {/* ===========================
              Right Panel
          =========================== */}

          <div className="right-panel">

            <div className="card ai-card">

              <div className="ai-header">

                <div>

                  <h2>

                    AI Analysis

                  </h2>

                  <span>

                    Powered by RAG + Llama 3.2

                  </span>

                </div>

                <div className="status">

                  ONLINE

                </div>

              </div>

              {loading && (

                <div className="loading-container">

                  <div className="spinner"></div>

                  <h3>

                    Analyzing Document...

                  </h3>

                  <p>

                    Searching vector database and generating response...

                  </p>

                </div>

              )}

              {!loading && !answer && (

                <div className="empty-state">

                  <div className="empty-icon">

                    🤖

                  </div>

                  <h3>

                    Ready to Assist

                  </h3>

                  <p>

                    Upload a legal document and ask a question to receive an AI-generated legal analysis with source page references.

                  </p>

                </div>

              )}

              {!loading && answer && (

                <section

                  ref={reportsRef}

                  className="answer-section"

                >

                  <h2 className="answer-title">

                    AI Response

                  </h2>

                  <div className="answer-content">

                    {answer}

                  </div>

                  <div className="reference-box">

                    📑 Source Page : {page}

                  </div>

                  <div className="action-buttons">

                    <button

                      className="secondary-btn"

                      onClick={copyAnswer}

                    >

                      📋 Copy

                    </button>

                    <button

                      className="secondary-btn"

                      onClick={downloadPDF}

                    >

                      📥 Download PDF

                    </button>

                    <button

                      className="secondary-btn"

                      onClick={printAnswer}

                    >

                      🖨 Print

                    </button>

                  </div>

                </section>

              )}

            </div>
                        {/* ===========================
                Settings Section
            =========================== */}

            <section
              ref={settingsRef}
              className="card"
              style={{ marginTop: "30px" }}
            >

              <h2>⚙ Project Information</h2>

              <br />

              <h3>About</h3>

              <p>

                Legal AI Assistant is an AI-powered legal document analysis
                system that combines Retrieval Augmented Generation (RAG)
                with Llama 3.2 to answer questions from uploaded legal
                documents.

              </p>

              <br />

              <h3>Technology Stack</h3>

              <br />

              <div className="footer-right">

                <span>React</span>

                <span>FastAPI</span>

                <span>FAISS</span>

                <span>Sentence Transformers</span>

                <span>Ollama</span>

                <span>Llama 3.2</span>

                <span>RAG</span>

              </div>

              <br />

              <h3>Version</h3>

              <p>

                Version 1.0.0

              </p>

              <br />

              <h3>Developer</h3>

              <p>

                Ashwin Vipin

              </p>

              <p>

                B.Tech Computer Science (Blockchain)

              </p>

            </section>

          </div>

        </section>

        {/* ===========================
            Footer
        =========================== */}

        <footer className="footer">

          <div>

            <h3>

              ⚖ Legal AI Assistant

            </h3>

            <p>

              AI Powered Legal Document Analysis using RAG & LLM

            </p>

          </div>

          <div className="footer-right">

            <span>FastAPI</span>

            <span>React</span>

            <span>FAISS</span>

            <span>Llama 3.2</span>

            <span>Ollama</span>

          </div>

        </footer>

      </main>

    </div>

  );

}

export default App;