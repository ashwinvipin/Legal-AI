⚖️ AI-Based Legal Document Analysis and Question Answering System

🤖 Project Overview

AI-based system for analyzing legal PDF documents.

Allows users to upload legal documents and ask questions in natural language.

Designed for documents such as contracts, agreements, NDAs, and policy documents.

Uses Retrieval-Augmented Generation (RAG) to retrieve relevant information before generating an answer.

Uses Llama 3.2 through Ollama for AI-based answer generation.

Uses semantic search to identify relevant sections of the uploaded document.

Displays source page information to help users locate the relevant content.

✨ Key Features

📄 Upload legal documents in PDF format.

📝 Extract text from uploaded PDF documents.

✂️ Divide extracted text into meaningful chunks.

🧠 Generate embeddings for document content.

🗂️ Store embeddings using FAISS.

🔍 Perform semantic similarity search.

💬 Ask questions about the uploaded document.

📚 Retrieve relevant document sections before generating answers.

🤖 Generate context-based answers using Llama 3.2.

🦙 Run the AI model locally through Ollama.

📍 Display relevant source page information.

📋 Copy generated answers.

🖨️ Print analysis results.

📥 Download question-and-answer results as a PDF.

🎨 Provide a clean and interactive web interface.

🛠️ Technology Stack

🎨 Frontend

⚛️ React.js – User interface development.

🟨 JavaScript – Frontend functionality and application logic.

🎨 CSS – User interface styling and responsive design.

🔗 Axios – Communication between frontend and backend.

📄 jsPDF – Generation and download of analysis results as PDF.

⚡ Backend

🐍 Python – Core backend programming language.

⚡ FastAPI – Development of REST API services.

🚀 Uvicorn – ASGI server for running the FastAPI application.

🤖 Artificial Intelligence and RAG

🧩 Retrieval-Augmented Generation (RAG) – Context-based question answering.

🧠 Sentence Transformers – Generation of text embeddings.

🔤 all-MiniLM-L6-v2 – Semantic embedding model.

🗂️ FAISS – Vector storage and similarity search.

🦙 Ollama – Local Large Language Model runtime.

🤖 Llama 3.2 – AI-based answer generation.

📄 Document Processing

📑 PyMuPDF – PDF text extraction and page processing.

🧰 Development Tools

🔧 Git – Version control.

🐙 GitHub – Source code repository and project backup.

🧠 Working Methodology

📄 Document Processing

The user uploads a legal document in PDF format.

The backend extracts text and page information from the document.

The extracted text is divided into smaller meaningful chunks.

Each chunk is converted into a numerical vector representation.

The generated embeddings are stored in the FAISS vector database.

💬 Question Answering

The user asks a question in natural language.

The question is converted into an embedding using the Sentence Transformers model.

FAISS performs semantic similarity search.

The most relevant document chunks are retrieved.

The retrieved chunks are used as context for the AI model.

Llama 3.2 analyzes the provided context and generates an answer.

The answer and relevant source page information are displayed to the user.

🧩 AI Concepts Used

🤖 Large Language Model

Llama 3.2 is used to generate answers based on the retrieved document context.

The model runs locally through Ollama.

The AI model receives relevant context instead of processing the complete document for every question.

🧠 Retrieval-Augmented Generation

RAG is the main AI architecture used in the project.

Relevant document sections are retrieved before answer generation.

This helps ground the generated answer in the uploaded document.

The approach reduces irrelevant responses and improves document-based question answering.

🔢 Embeddings

Document chunks are converted into vector representations.

User questions are also converted into embeddings.

The system uses these representations to compare semantic meaning.

🔍 Semantic Search

FAISS searches for document sections that are semantically related to the user's question.

Relevant information can be retrieved even when the exact wording of the question is different from the wording in the document.

📁 Project Structure

📦 Legal-AI

📂 backend

🐍 app.py

🧩 rag.py

📄 pdf_loader.py

🧠 embeddings.py

🗂️ vector_store.py

📋 requirements.txt

📂 frontend

📂 frontend

📂 src

⚛️ App.js

🎨 App.css

📋 package.json

📖 README.md

🚀 Installation and Setup

📌 Requirements

🐍 Python

🟩 Node.js and npm

🦙 Ollama

🔧 Git

1️⃣ Clone the Repository

git clone https://github.com/Syed-subhan1207/Legal-AI.git
cd Legal-AI

2️⃣ Install Backend Dependencies

cd backend
pip install fastapi uvicorn ollama pymupdf sentence-transformers faiss-cpu

3️⃣ Run the Backend

uvicorn app:app --reload

Backend server: http://127.0.0.1:8000

API documentation: http://127.0.0.1:8000/docs

4️⃣ Set Up Ollama

ollama pull llama3.2

5️⃣ Install Frontend Dependencies

cd frontend/frontend
npm install

6️⃣ Run the Frontend

npm start

Open the frontend using the local address displayed by the React development server.

🎯 Main Project Objectives

Simplify the process of understanding complex legal documents.

Reduce the effort required to manually search through lengthy documents.

Allow users to ask questions using natural language.

Retrieve relevant information using semantic search.

Generate answers based on the contents of the uploaded document.

Display source page information for better transparency.

Demonstrate the practical use of RAG and Large Language Models.

Integrate AI technologies with a modern full-stack web application.

🔮 Future Enhancements

📚 Support for multiple legal documents.

💬 Conversation history and follow-up questions.

🏷️ Advanced legal clause classification.

📝 Automatic legal document summarization.

🌍 Multilingual document analysis.

🔐 User authentication and account management.

💾 Persistent document storage.

☁️ Cloud-based vector databases.

📌 Improved source references.

🔎 Advanced document search and filtering.

🏛️ Integration with professional legal information systems.

⚠️ Limitations

The current implementation is mainly designed for academic and demonstration purposes.

Answer quality depends on PDF text extraction and the quality of retrieved context.

Performance depends on the embedding model and local LLM configuration.

The application is designed as a document analysis and question-answering tool.

⚖️ Disclaimer: This system is not a replacement for professional legal advice.

👨‍💻 Author

Syed Subhan

🎓 Developed as an individual AI internship project.
