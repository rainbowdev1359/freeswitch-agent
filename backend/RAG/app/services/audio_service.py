import os
import logging
from langchain_community.document_loaders import AssemblyAIAudioTranscriptLoader
from langchain_openai import OpenAIEmbeddings
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ASSEMBLYAI_API_KEY = os.getenv('ASSEMBLYAI_API_KEY')

def audio_import(path: str):
    logger.info(f"Starting audio import for the file at path: {path}")
    
    try:
        # Load the audio file using the AssemblyAIAudioTranscriptLoader
        loader = AssemblyAIAudioTranscriptLoader(file_path=path)
        
        # Load the audio transcript
        documents = loader.load()
        
        logger.info(f"Successfully loaded {len(documents)} documents from the audio.")
        logger.debug(f"Loaded documents: {documents}")  # Log loaded documents for inspection

        # Proceed to store these documents
        store_in_pinecone(documents)

    except Exception as e:
        logger.error(f"An error occurred during audio import: {str(e)}")
        raise  # Reraise the exception after logging it

def store_in_pinecone(documents):
    """Stores the loaded documents in Pinecone."""
    try:
        embeddings_model = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))
        
        pc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
        
        index_name = os.getenv('PINECONE_INDEX')
        namespace = os.getenv('PINECONE_NAMESPACE')
        
        existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]
        
        if index_name not in existing_indexes:
            logger.info(f"Creating a new Pinecone index: {index_name}")
            pc.create_index(
                name=index_name,
                dimension=1536,
                metric="cosine",
            )
        
        logger.debug(f"Index {index_name} is ready. Proceeding to store documents.")

        # Extract texts and metadata from documents
        texts = [doc.page_content for doc in documents]  # Assuming documents have a property 'page_content'
        
        # Check the structure of metadata
        metadatas = []
        for doc in documents:
            logger.debug(f"Inspecting document: {doc}")  # Log the entire document for inspection
            metadata = {
                "title": doc.metadata.get("title", "Untitled"),  # Default title if missing
                "audio_end_at": doc.metadata.get("audio_end_at") if doc.metadata.get("audio_end_at") is not None else "0",  # Default to '0' if null
                # Add more metadata fields as necessary
            }
            logger.debug(f"Document metadata: {metadata}")  # Log each document's metadata for inspection
            metadatas.append(metadata)

        # Store documents in Pinecone
        vector_store = PineconeVectorStore.from_texts(
            texts,
            embeddings_model,
            metadatas=metadatas,
            index_name=index_name,
            namespace=namespace,
        )
        
        logger.info("Documents successfully stored in Pinecone.")

    except Exception as e:
        logger.error(f"An error occurred while storing documents in Pinecone: {str(e)}")
        raise  # Reraise the exception after logging it