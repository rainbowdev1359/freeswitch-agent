# agents/models.py

from django.db import models

class Agent(models.Model):
    voiceID = models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=255, null=True, blank=True)
    agentType = models.CharField(max_length=255, null=True, blank=True)  # Add default value
    documentType = models.CharField(max_length=255, null=True, blank=True)
    methodType = models.CharField(max_length=255, null=True, blank=True)
    prompt = models.CharField(max_length=100000, null=True, blank=True)
    temperature = models.CharField(max_length=255, default="0.5", null=True, blank=True)
    interruption = models.CharField(max_length=255, default="100", null=True, blank=True)
    info = models.JSONField()
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)  # New field for thumbnail
    policies = models.TextField(null=True, blank=True)
    rules = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.agentType} - {self.voiceID} - {self.language}"

class Objective(models.Model):
    agent = models.ForeignKey('Agent', on_delete=models.CASCADE)  # Foreign key to Agent model
    question = models.CharField(max_length=255, null=True, blank=True)
    answer = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Objective: {self.question} - Agent ID: {self.agent.id}"
    
class Product(models.Model):
    agent = models.ForeignKey('Agent', on_delete=models.CASCADE)  # Foreign key to Agent model
    code = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)  # Changed to TextField for large text
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Changed to DecimalField
    unit = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Product: {self.name} - Code: {self.code} - Agent ID: {self.agent.id}"