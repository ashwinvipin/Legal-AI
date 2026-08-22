⚖️ AI-Based Legal Document Analysis & Question Answering System
🤖 An intelligent Legal AI application that helps users understand and analyze legal PDF documents using RAG, LLMs, Semantic Search, and Vector Embeddings.

🌟 Overview
Legal documents such as contracts, agreements, NDAs, and policies can be lengthy and difficult to understand. This project allows users to upload a legal PDF and ask questions in natural language.

The system uses Retrieval-Augmented Generation (RAG) to retrieve relevant sections from the document and generates context-based answers using Llama 3.2 through Ollama.

✨ Features
📄 Upload legal documents in PDF format

🔍 Extract text from uploaded PDF documents

✂️ Split document text into meaningful chunks

🧠 Generate vector embeddings for document chunks

🗂️ Store and search embeddings using FAISS

🔎 Perform semantic similarity search

💬 Ask questions about uploaded legal documents

📚 Retrieve relevant document context before answer generation

🤖 Generate context-based answers using Llama 3.2

🦙 Run the LLM locally through Ollama

📍 Display relevant source page information

📋 Copy generated answers

🖨️ Print analysis results

📥 Download question-and-answer results as a PDF

🎨 Interactive and responsive user interface

🏗️ Project Architecture
👤 User
   │
   ▼
⚛️ React Frontend
   │
   │  📄 PDF Upload / 💬 Question
   ▼
⚡ FastAPI Backend
   │
   ├── 📄 PDF Processing (PyMuPDF)
   │       │
   │       ▼
   │    📝 Text Extraction
   │       │
   │       ▼
   │    ✂️ Text Chunking
   │       │
   │       ▼
   │ 🧠 Sentence Transformers
   │       │
   │       ▼
   │    🔢 Embeddings
   │       │
   │       ▼
   │ 🗂️ FAISS Vector Store
   │
   └── 💬 User Question
           │
           ▼
      🔢 Question Embedding
           │
           ▼
    🔎 Semantic Similarity Search
           │
           ▼
   📚 Relevant Document Chunks
           │
           ▼
        🧩 RAG Context
           │
           ▼
    🤖 Llama 3.2 via Ollama
           │
           ▼
   💡 Context-Based Answer
           │
           ▼
📱 React UI + 📍 Source Page
⚙️ How It Works
1️⃣ Upload PDF
The user uploads a legal document in PDF format.

2️⃣ PDF Text Extraction
The backend extracts text and page-related information from the PDF.

3️⃣ Text Chunking
The extracted document text is divided into smaller meaningful chunks.

4️⃣ Embedding Generation
The chunks are converted into vector representations using a Sentence Transformers model.

5️⃣ Vector Storage
The embeddings are stored in a FAISS vector index.

6️⃣ Question Processing
When the user asks a question, it is also converted into an embedding.

7️⃣ Semantic Search
FAISS retrieves the document chunks most semantically relevant to the question.

8️⃣ RAG Context Retrieval
The relevant chunks and source information are provided as context to the LLM.

9️⃣ Answer Generation
Llama 3.2, running locally through Ollama, generates an answer based on the retrieved document context.

🔟 Result Display
The frontend displays the generated answer and relevant source page information. Users can copy, print, or download the result.

🛠️ Tech Stack
🎨 Frontend
Technology	Purpose
⚛️ React.js	User interface development
🟨 JavaScript	Application logic and frontend functionality
🎨 CSS	Styling and responsive user interface
🔗 Axios	Frontend-backend communication
📄 jsPDF	PDF generation and download
⚡ Backend
Technology	Purpose
🐍 Python	Core backend programming
⚡ FastAPI	REST API development
🚀 Uvicorn	ASGI server for running the backend
🤖 AI & RAG
Technology	Purpose
🧩 RAG	Context-based document question answering
🧠 Sentence Transformers	Embedding generation
🔤 all-MiniLM-L6-v2	Semantic text embedding model
🗂️ FAISS	Vector storage and similarity search
🦙 Ollama	Local LLM runtime
🤖 Llama 3.2	Context-based answer generation
📄 Document Processing
Technology	Purpose
📑 PyMuPDF	PDF text extraction and page processing
🧰 Development Tools
Technology	Purpose
🔧 Git	Version control
🐙 GitHub	Source code repository and project backup
🧠 AI Concepts Used
🤖 Large Language Model (LLM)
Llama 3.2 generates answers based on relevant context retrieved from the uploaded legal document.

🧩 Retrieval-Augmented Generation (RAG)
RAG is the core architecture of the project. Instead of sending the entire document to the LLM for every question, the system first retrieves the most relevant sections and provides them as context.

🔢 Embeddings
The all-MiniLM-L6-v2 Sentence Transformers model converts document chunks and user questions into numerical vector representations.

🔎 Semantic Search
FAISS compares vector representations to identify document sections that are semantically relevant to the user's question.

📁 Project Structure
📦 Legal-AI/
│
├── 📂 backend/
│   ├── 🐍 app.py
│   ├── 🧩 rag.py
│   ├── 📄 pdf_loader.py
│   ├── 🧠 embeddings.py
│   ├── 🗂️ vector_store.py
│   └── 📋 requirements.txt
│
├── 📂 frontend/
│   └── 📂 frontend/
│       ├── 📂 src/
│       │   ├── ⚛️ App.js
│       │   └── 🎨 App.css
│       ├── 📋 package.json
│       └── 📋 package-lock.json
│
└── 📖 README.md
💡 The exact file structure may vary depending on your local project setup.

🚀 Installation & Setup
📌 Prerequisites
Make sure the following are installed:

🐍 Python

🟩 Node.js and npm

🦙 Ollama

🔧 Git

You also need the Llama 3.2 model available in Ollama.

1️⃣ Clone the Repository
git clone https://github.com/Syed-subhan1207/Legal-AI.git
cd Legal-AI
2️⃣ Backend Setup
Move to the backend directory:

cd backend
Install the required dependencies:

pip install fastapi uvicorn ollama pymupdf sentence-transformers faiss-cpu
Run the backend:

uvicorn app:app --reload
The backend should run at:

http://127.0.0.1:8000
📚 FastAPI API documentation:

http://127.0.0.1:8000/docs
3️⃣ Ollama Setup
Make sure Ollama is installed and the required model is available:

ollama pull llama3.2
4️⃣ Frontend Setup
Open another terminal and move to the frontend directory:

cd frontend/frontend
Install dependencies:

npm install
Start the React application:

npm start
🌐 The frontend will open at the address shown by the React development server.

🔄 API Workflow
📤 Document Upload
📄 PDF Upload
      ↓
⚡ FastAPI
      ↓
📝 Text Extraction
      ↓
✂️ Chunking
      ↓
🧠 Embedding Generation
      ↓
🗂️ FAISS Vector Storage
💬 Question Answering
💬 User Question
      ↓
🔢 Question Embedding
      ↓
🔎 FAISS Semantic Search
      ↓
📚 Relevant Document Chunks
      ↓
🧩 RAG Context
      ↓
🤖 Llama 3.2 via Ollama
      ↓
💡 Generated Answer + 📍 Source Page
🔮 Future Enhancements
📚 Support for multiple PDF documents

💬 Conversation history

🏷️ Advanced legal clause classification

📝 Legal document summarization

🌍 Multilingual document analysis

🔐 User authentication

💾 Persistent document storage

☁️ Cloud-based vector databases

📌 Improved source citations

🔍 Advanced legal search and filtering

🏛️ Integration with professional legal information systems

⚠️ Limitations
This system is mainly developed for academic and demonstration purposes. Answer quality depends on the extracted PDF text, retrieved context, embedding quality, and the local LLM.

⚖️ Disclaimer: This application is an AI-based document analysis tool and should not be treated as a replacement for professional legal advice.

👨‍💻 Author
Ashwin Vipin

🎓 Developed as an individual AI internship project.

📜 License
This project is intended for educational and academic purposes
