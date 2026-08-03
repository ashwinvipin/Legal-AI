import ollama

from prompt import SYSTEM_PROMPT
from pdf_loader import PDFLoader
from embeddings import EmbeddingModel
from vector_store import VectorStore


class LegalRAG:

    def __init__(self):

        self.loader = PDFLoader()
        self.embedding = EmbeddingModel()
        self.vector_store = VectorStore()

    def process_pdf(self, pdf_path):

        pages = self.loader.extract_text(pdf_path)

        chunks = self.loader.chunk_text(pages)

        embeddings, metadata = self.embedding.create_embeddings(chunks)

        self.vector_store.add_embeddings(
            embeddings,
            metadata
        )

        self.vector_store.save()

        return len(chunks)

    def ask(self, question):

        self.vector_store.load()

        question_embedding = self.embedding.embed_query(question)

        results = self.vector_store.search(
            question_embedding,
            top_k=5
        )

        context = ""

        references = []

        best_page = None

        for index, item in enumerate(results):

            context += f"""

Page {item['page']}

{item['content']}

"""

            references.append(item["page"])

            # First retrieved chunk is usually the most relevant
            if index == 0:
                best_page = item["page"]

        prompt = SYSTEM_PROMPT.format(
            context=context,
            question=question
        )

        response = ollama.chat(
            model="llama3.2",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return {

            "answer": response["message"]["content"],

            "page": best_page,

            "related_pages": sorted(list(set(references)))

        }