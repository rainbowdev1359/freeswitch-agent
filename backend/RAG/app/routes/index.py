from fastapi import APIRouter
from app.controllers import upload
from app.controllers import chat

api_router = APIRouter()

# Include the upload router
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])

def load_routes(app):
    app.include_router(api_router)