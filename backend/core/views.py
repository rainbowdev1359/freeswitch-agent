from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
# from .models import Contacts, Knowledge
from .models import UserProfile
# from .serializers import ContactsSerializer, KnowledgeSerializer, UserSerializer
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
import logging
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .token_utils import refresh_jwt_token
from django.db.models import Q
from datetime import datetime, timedelta
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

logger = logging.getLogger(__name__)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# Utility View for Refreshing JWT Tokens
class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return JsonResponse({
                'error': 'Refresh token is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        return refresh_jwt_token(refresh_token)

class UsernameAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            user_data = UserSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error retrieving username: {e}", exc_info=True)
            return Response({"error": "Error retrieving username"}, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RemoveUserAPIView(APIView):
    def post(self, request):
        # Extract the data from the request
        data = request.data
        user_id = data.get('user_id')

        if not user_id:
            return Response({"error": "User ID not provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the user
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Retrieve and delete the associated UserProfile
            user_profile = UserProfile.objects.get(user=user)
            user_profile.delete()
        except UserProfile.DoesNotExist:
            return Response({"error": "UserProfile not found."}, status=status.HTTP_404_NOT_FOUND)

        # Delete the user
        user.delete()

        return Response({"success": "User and associated UserProfile deleted successfully."}, status=status.HTTP_200_OK)

class UpdateUserAPIView(APIView):
    def post(self, request):
        # Extract the data from the request
        data = request.data

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        phone = data.get('phone')
        user_id = data.get('user_id')
        group_id = data.get('group_id')

        if not user_id:
            return Response({"error": "User ID not provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the user
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update user information
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if email:
            user.email = email
        user.save()

        try:
            # Retrieve the associated UserProfile
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "UserProfile not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update UserProfile information
        if phone:
            user_profile.phone_number = phone
        if group_id:
            user_profile.role_manage_id = group_id
        user_profile.save()

        return Response({"success": "User updated successfully."}, status=status.HTTP_200_OK)