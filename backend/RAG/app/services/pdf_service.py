import time
import logging
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Set up logging
logging.basicConfig(level=logging.INFO)  # You can set to DEBUG for more detailed output
logger = logging.getLogger(__name__)

def pdf_import(path: str):
    logger.info(f"Starting PDF import for the file at path: {path}")
    try:
        logger.debug("Loading PDF document...")
        loader = PyPDFLoader(file_path=path)
        doc = loader.load()
        logger.info(f"Successfully loaded {len(doc)} documents from the PDF.")

        embeddings_model = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))
        
        pc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
        
        existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]
        index_name = os.getenv('PINECONE_INDEX')
        namespace = os.getenv('PINECONE_NAMESPACE')
        
        if index_name not in existing_indexes:
            logger.info(f"Creating a new Pinecone index: {index_name}")
            pc.create_index(
                name=index_name,
                dimension=1536,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1"),
            )
            while not pc.describe_index(index_name).status["ready"]:
                logger.info(f"Waiting for index {index_name} to be ready...")
                time.sleep(1)
        
        logger.debug(f"Index {index_name} is ready. Proceeding to store documents.")
        
        PineconeVectorStore.from_documents(
            doc,
            embeddings_model,
            index_name=index_name,
            namespace=namespace,
        )
        logger.info("Documents successfully stored in Pinecone.")

    except Exception as e:
        logger.error(f"An error occurred during PDF import: {str(e)}")
        raise  # Reraise the exception after logging it