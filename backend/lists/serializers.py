from rest_framework import serializers
from .models import List

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'name', 'company_affiliated', 'created_date', 'agent_assign']
        read_only_fields = ['created_date']