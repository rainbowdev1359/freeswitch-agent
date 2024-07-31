from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import UserProfile
from roles.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'group_name', 'is_activate']  # Adjust fields as per your Group model

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'phone_number', 'role_manage']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'first_name', 'last_name', 'profile']

class SetUserRoleSerializer(serializers.Serializer):
    user_profile_id = serializers.IntegerField()
    role_manage_id = serializers.IntegerField()