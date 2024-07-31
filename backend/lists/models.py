from django.db import models
from django.utils import timezone

class List(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    company_affiliated = models.CharField(max_length=100, null=True, blank=True)
    agent_assign = models.CharField(max_length=100, null=True, blank=True)
    created_date = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name