from fastapi import APIRouter, File, UploadFile, HTTPException
from pathlib import Path
import os
from app.services.pdf_service import pdf_import
from app.services.audio_service import audio_import  # Import the audio import function
from app.services.video_service import video_import  # Import the video import function
from datetime import datetime  # Importing datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
router = APIRouter()

MEDIA_DIR = Path(os.getenv('MEDIA_DIR', '/home/ubuntu/epic-rag-langchain/app/media'))

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    # Ensure the media directory exists
    MEDIA_DIR.mkdir(parents=True, exist_ok=True)

    # Get the current timestamp
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")  # Format: YYYYMMDD_HHMMSS

    # Define the new file name with the original name and current time
    original_filename = file.filename.rsplit('.', 1)[0]  # Get filename without extension
    file_extension = file.filename.rsplit('.', 1)[-1]  # Get the file extension
    new_filename = f"{original_filename}_{current_time}.{file_extension}"  # Create new filename

    # Define the file path
    file_path = MEDIA_DIR / new_filename

    # Check file size (optional)
    file_size = await file.read()  # Read the file content
    if len(file_size) > 50 * 1024 * 1024:  # 50 MB limit
        raise HTTPException(status_code=400, detail="File too large")
    
    # Move the file cursor back to the start
    await file.seek(0)

    # Save the file
    with open(file_path, "wb") as buffer:
        buffer.write(file_size)

    # Determine the file type
    if file_extension.lower() in ['mp3', 'wav', 'm4a', 'ogg']:  # Add other audio formats as necessary
        audio_import(path=str(file_path))  # Call the audio import function
    elif file_extension.lower() in ['pdf']:  # Check if it's a PDF file
        pdf_import(path=str(file_path))  # Call the PDF import function
    elif file_extension.lower() in ['mp4', 'mov', 'avi', 'mkv']:  # Add other video formats as necessary
        video_import(video_path=str(file_path))  # Call the video import function
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    return {"filename": new_filename, "url": str(file_path)}  # Return new filename and URL