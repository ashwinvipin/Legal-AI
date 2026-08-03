import faiss
import pickle
import os
import numpy as np


class VectorStore:

    def __init__(self):

        self.dimension = 384

        self.index = faiss.IndexFlatL2(self.dimension)

        self.metadata = []

    def add_embeddings(self, embeddings, metadata):

        embeddings = np.array(embeddings).astype("float32")

        self.index.add(embeddings)

        self.metadata.extend(metadata)

    def save(self, folder="vector_db"):

        if not os.path.exists(folder):
            os.makedirs(folder)

        faiss.write_index(
            self.index,
            os.path.join(folder, "legal.index")
        )

        with open(
            os.path.join(folder, "metadata.pkl"),
            "wb"
        ) as f:

            pickle.dump(self.metadata, f)

    def load(self, folder="vector_db"):

        self.index = faiss.read_index(
            os.path.join(folder, "legal.index")
        )

        with open(
            os.path.join(folder, "metadata.pkl"),
            "rb"
        ) as f:

            self.metadata = pickle.load(f)

    def search(self, query_embedding, top_k=5):

        query_embedding = np.array(
            [query_embedding]
        ).astype("float32")

        distances, indices = self.index.search(
            query_embedding,
            top_k
        )

        results = []

        for idx in indices[0]:

            if idx < len(self.metadata):
                results.append(
                    self.metadata[idx]
                )

        return results