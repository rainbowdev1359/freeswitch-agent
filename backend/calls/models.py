# models.py
from django.db import models

class Call(models.Model):
    call_id = models.CharField(max_length=255, unique=True)
    agent = models.ForeignKey('agents.Agent', on_delete=models.CASCADE, related_name='calls')  # Change this line
    call_length = models.IntegerField(null=True, blank=True)
    batch_id = models.CharField(max_length=255, null=True, blank=True)
    to_number = models.CharField(max_length=255, null=True, blank=True)
    from_number = models.CharField(max_length=255, null=True, blank=True)
    request_data = models.JSONField(null=True, blank=True)
    completed = models.BooleanField(null=True, default=False)  # Make this field nullable temporarily
    created_at = models.DateTimeField(null=True, blank=True)
    inbound = models.BooleanField(default=False, null=True)  # Allow null values
    queue_status = models.CharField(max_length=255, null=True, blank=True)
    endpoint_url = models.URLField(null=True, blank=True)
    max_duration = models.IntegerField(null=True, blank=True)
    error_message = models.TextField(null=True, blank=True)
    variables = models.JSONField(null=True, blank=True)
    answered_by = models.CharField(max_length=255, null=True, blank=True)
    record = models.BooleanField(default=False, null=True)  # Allow null values
    recording_url = models.URLField(null=True, blank=True)
    c_id = models.CharField(max_length=255, null=True, blank=True)
    metadata = models.JSONField(null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    local_dialing = models.BooleanField(default=False, null=True)  # Allow null values
    call_ended_by = models.CharField(max_length=255, null=True, blank=True)
    pathway_logs = models.JSONField(null=True, blank=True)
    analysis_schema = models.JSONField(null=True, blank=True)
    analysis = models.JSONField(null=True, blank=True)
    transferred_to = models.CharField(max_length=255, null=True, blank=True)
    concatenated_transcript = models.TextField(null=True, blank=True)
    transcripts = models.JSONField(null=True, blank=True)
    call_status = models.CharField(max_length=255, null=True, blank=True)
    corrected_duration = models.IntegerField(null=True, blank=True)
    end_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.call_id