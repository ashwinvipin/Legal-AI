from fastapi import FastAPI, UploadFile, File

from fastapi.middleware.cors import CORSMiddleware

import shutil

import os

from rag import LegalRAG

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

rag = LegalRAG()


@app.get("/")
def home():

    return {
        "message": "Legal AI Backend Running"
    }


@app.post("/upload")

async def upload_pdf(file: UploadFile = File(...)):

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(filepath, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    chunks = rag.process_pdf(filepath)

    return {

        "status": "success",

        "chunks_created": chunks

    }


@app.post("/ask")

async def ask_question(data: dict):

    question = data.get("question")

    result = rag.ask(question)

    return result