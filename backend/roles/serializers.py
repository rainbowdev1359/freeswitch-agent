from rest_framework import serializers
from .models import Manage, Category, Group, Section

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['section_name']

class CategorySerializer(serializers.ModelSerializer):
    role_section = SectionSerializer()

    class Meta:
        model = Category
        fields = ['category_name', 'role_section']

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['group_name']

class ManageSerializer(serializers.ModelSerializer):
    role_category = CategorySerializer()
    role_group = GroupSerializer()

    class Meta:
        model = Manage
        fields = ['role_category', 'role_group', 'is_permission']

class CustomManageSerializer(serializers.Serializer):
    action_section = serializers.CharField()
    sub_category = serializers.CharField()
    super_admin = serializers.BooleanField()
    admin = serializers.BooleanField()
    technical_support = serializers.BooleanField()
    customer_support = serializers.BooleanField()
    billing_support = serializers.BooleanField()
    marketing_branding = serializers.BooleanField()
    representative = serializers.BooleanField()
    representative_assistance = serializers.BooleanField()