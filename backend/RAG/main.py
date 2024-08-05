import uvicorn
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import index as indexRoute
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

indexRoute.load_routes(app)

if __name__ == "__main__":
    # Use the import string format for running Uvicorn with reload
    host = os.getenv('HOST', '0.0.0.0')  # Default to localhost if not set
    port = os.getenv('PORT', '8001')       # Default to port 8000 if not set

    uvicorn.run("main:app", host=host, port=int(port), reload=True)