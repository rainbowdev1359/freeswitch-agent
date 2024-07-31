from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import status
from django.http import JsonResponse
import logging

# Set up logging
logger = logging.getLogger(__name__)

def refresh_jwt_token(refresh_token):
    """
    Utility function to refresh JWT access token using the provided refresh token.
    Args:
        refresh_token (str): The JWT refresh token.
    Returns:
        JsonResponse: A response containing the new access token or an error message.
    """
    try:
        # Attempt to create a new token using the refresh token
        token = RefreshToken(refresh_token)
        access_token = str(token.access_token)

        # Log the success of token refresh
        logger.info("Access token refreshed successfully.")

        # Return new access token
        return JsonResponse({
            'access': access_token
        }, status=status.HTTP_200_OK)
        
    except TokenError as e:
        # Handle invalid or expired refresh token
        logger.error(f"Error refreshing JWT token: {e}", exc_info=True)
        return JsonResponse({
            'error': 'Invalid or expired refresh token',
            'details': str(e)
        }, status=status.HTTP_401_UNAUTHORIZED)