from django.utils.deprecation import MiddlewareMixin
import logging

# Set up logging
logger = logging.getLogger(__name__)

class AppendJWTTokenMiddleware(MiddlewareMixin):
    """
    Middleware to append JWT token to every outgoing response.
    """

    def process_response(self, request, response):
        try:
            # Check if JWT tokens are in the session
            access_token = request.session.get('access_token')
            refresh_token = request.session.get('refresh_token')

            # If tokens are present, append them to the response headers
            if access_token and refresh_token:
                response['Access-Token'] = access_token
                response['Refresh-Token'] = refresh_token
                logger.info("JWT tokens appended to response headers successfully.")
            else:
                logger.info("No JWT tokens found in session to append to response headers.")
        except Exception as e:
            logger.error(f"Error appending JWT tokens to response headers: {e}", exc_info=True)
        
        return response