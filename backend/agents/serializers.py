# agents/serializers.py

from rest_framework import serializers
from .models import Agent, Objective, Product

class AgentSerializer(serializers.ModelSerializer):
    minutesTalked = serializers.IntegerField(read_only=True)
    completedLeads = serializers.FloatField(read_only=True)
    totalFinishedCalls = serializers.IntegerField(read_only=True)
    totalIncomingCalls = serializers.IntegerField(read_only=True, default=0)

    class Meta:
        model = Agent
        fields = [
            'id', 'voiceID', 'language', 'agentType', 'documentType', 
            'prompt', 'info', 'thumbnail', 'temperature', 'interruption', 'methodType', 'policies', 'rules', 'minutesTalked', 'completedLeads', 
            'totalFinishedCalls', 'totalIncomingCalls'
        ]

class ObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objective
        fields = ['id', 'agent', 'question', 'answer', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'agent', 'code', 'name', 'description', 'price', 'unit', 'created_at', 'updated_at']