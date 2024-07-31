# knowledge/views.py
from django.db.models import Sum, Count, Q, F
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import generics
from .models import Knowledge
from .serializers import KnowledgeSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def create_knowledge(request):
    try:
        print(request.FILES)  # Debug: log request.FILES contents
        print(request.data)   # Debug: log request.data
        
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=400)

        file = request.FILES['file']
        file_path = request.data.get('file_path', '')
        file_name = file.name
        upload_date = request.data.get('Date')
        raw = request.data.get('raw', 'file data')  # Assuming this is the raw content you want to save
        user = request.user

        knowledge = Knowledge(
            user_id=user,
            file_path=file_path,
            file_name=file_name,
            Date=upload_date,
            raw=raw,
            file=file
        )
        
        knowledge.save()

        return Response({'message': 'File uploaded successfully', 'file_id': knowledge.id}, status=201)
    except Exception as e:
        logger.error(f"Error in create_knowledge view: {e}", exc_info=True)
        return Response({'error': 'File upload failed: ' + str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_knowledges(request):
    # Filter Knowledge objects by the currently authenticated user
    knowledges = Knowledge.objects.filter(user_id=request.user)
    serializer = KnowledgeSerializer(knowledges, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_knowledge_by_id(request, pk):
    return Response("")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_knowledge_by_id(request, pk):
    return Response("")

@api_view(['POST'])
def update_knowledge_by_id(request):
    return Response("")