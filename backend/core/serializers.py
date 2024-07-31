from django.contrib.auth.models import User
from rest_framework import serializers
import logging
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from roles.models import Group, Manage, Category, Section
from .models import UserProfile

# Set up logging
logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'section_name', 'is_activate', 'created_at', 'updated_at']

class CategorySerializer(serializers.ModelSerializer):
    role_section = SectionSerializer(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'category_name', 'is_activate', 'role_section', 'created_at', 'updated_at']

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'group_name', 'is_activate', 'created_at', 'updated_at']

class ManageSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='role_category.category_name', read_only=True)
    section_name = serializers.CharField(source='role_category.role_section.section_name', read_only=True)
    group_name = serializers.CharField(source='role_group.group_name', read_only=True)

    class Meta:
        model = Manage
        fields = ['id', 'is_permission', 'created_at', 'category_name', 'section_name', 'group_name']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid email or password')

        # Authenticate using the email and password
        user = authenticate(request=self.context.get('request'), username=user.username, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid email or password')

        # Generate token
        refresh = self.get_token(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username
        }

        # Add custom data from the Manage model
        try:
            user_profile = UserProfile.objects.select_related('role_manage').get(user=user)
            user_group = user_profile.role_manage

            # Fetch manage data related to the user's role_manage group, ordered by id
            manage_data = Manage.objects.filter(role_group=user_profile.role_manage).order_by('id')
            manage_serialized = ManageSerializer(manage_data, many=True).data
            group_serialized = GroupSerializer(user_group).data

            data.update({'permissions': manage_serialized, 'group': group_serialized})
        except UserProfile.DoesNotExist:
            data.update({'permissions': []})

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token