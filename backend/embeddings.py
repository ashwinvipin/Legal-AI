from sentence_transformers import SentenceTransformer


class EmbeddingModel:

    def __init__(self):
        print("Loading embedding model...")
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        print("Embedding model loaded.")

    def create_embeddings(self, chunks):
        """
        Converts text chunks into embeddings.

        Input:
        [
            {
                "page":1,
                "content":"..."
            }
        ]

        Output:
        embeddings,
        metadata
        """

        texts = [chunk["content"] for chunk in chunks]

        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True,
            show_progress_bar=True
        )

        metadata = []

        for chunk in chunks:
            metadata.append({
                "page": chunk["page"],
                "content": chunk["content"]
            })

        return embeddings, metadata

    def embed_query(self, question):
        """
        Creates embedding for a user question.
        """

        return self.model.encode(
            [question],
            convert_to_numpy=True
        )[0]