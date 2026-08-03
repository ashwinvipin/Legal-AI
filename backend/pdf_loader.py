import fitz  # PyMuPDF


class PDFLoader:
    def __init__(self):
        pass

    def extract_text(self, pdf_path):
        """
        Extracts text from a PDF along with page numbers.
        Returns:
        [
            {
                "page": 1,
                "text": "Page text..."
            },
            ...
        ]
        """

        document = fitz.open(pdf_path)

        pages = []

        for page_number in range(len(document)):
            page = document.load_page(page_number)

            text = page.get_text("text")

            pages.append({
                "page": page_number + 1,
                "text": text
            })

        document.close()

        return pages

    def chunk_text(self, pages, chunk_size=1000, overlap=200):
        """
        Splits extracted text into overlapping chunks.

        Returns:
        [
            {
                "page":1,
                "content":"...."
            }
        ]
        """

        chunks = []

        for page in pages:

            text = page["text"]

            start = 0

            while start < len(text):

                end = start + chunk_size

                chunk = text[start:end]

                chunks.append({
                    "page": page["page"],
                    "content": chunk
                })

                start += chunk_size - overlap

        return chunks