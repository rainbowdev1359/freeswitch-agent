from django.db import models
from django.conf import settings
import logging
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.models import User

# Set up logging
logger = logging.getLogger(__name__)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    role_manage = models.ForeignKey('roles.Group', on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return self.user.username


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True