from django.contrib.auth.models import User
from rest_framework import serializers, generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from core.models import UserProfile
import logging
from rest_framework import status
from django.db import transaction
from rest_framework.views import APIView


# Set up logging
logger = logging.getLogger(__name__)

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    phone_number = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        with transaction.atomic():
            username = validated_data['username']
            email = validated_data['email']
            password = validated_data['password']
            phone_number = validated_data.pop('phone_number')
            if email and User.objects.filter(email=email).exclude(username=username).exists():
                logger.error(f"Registration attempt with duplicate email: {email}")
                raise serializers.ValidationError({'email': 'Email addresses must be unique.'})
            try:
                user = User(username=username, email=email)
                user.set_password(password)
                user.save()
                
                # Ensure UserProfile is created for future use
                UserProfile.objects.create(user=user, phone_number=phone_number)

                logger.info(f"User {username} registered successfully.")
                return user
            except Exception as e:
                logger.error(f"Error registering user {username}: {e}", exc_info=True)
                raise serializers.ValidationError({"error": "Error during registration. Please try again later."})
    
    def to_representation(self, instance):
        """
        Override to_representation to include profile information.
        """
        representation = super().to_representation(instance)
        representation['phone_number'] = instance.profile.phone_number
        return representation
            
class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)  # Ensure this is a tuple
    authentication_classes = []  # Disable authentication for this view
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            # Create JWT tokens for the newly registered user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Prepare user data
            user_data = dict(serializer.data)

            # Include the tokens in the response
            response_data = {
                "user": user_data,
                "refresh": refresh_token,
                "access": access_token,
            }

            logger.info(f"User registration successful for {user.username}. Access and refresh tokens generated.")
            return Response(response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error during user registration: {e}", exc_info=True)
            return Response({"error": "Error during registration. Please check the provided data."}, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordAPIView(APIView):
    def post(self, request):
        # Extract the data from the request
        data = request.data
        user_id = data.get('user_id')
        new_password = data.get('new_password')
        
        try:
            # Validate the new password
            # validate_password(new_password)
            
            # Get the user by ID
            user = User.objects.get(id=user_id)
            
            # Set the new password
            user.set_password(new_password)
            user.save()
            
            return Response({"success": "Password has been reset."}, status=status.HTTP_200_OK)
        
        # except ValidationError as ve:
        #     return Response({"error": ve.messages}, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)