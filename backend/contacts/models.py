from django.db import models

class Contact(models.Model):
    firstName = models.CharField(max_length=100, null=True, blank=True)
    lastName = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    phoneNumber = models.CharField(max_length=15, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    companyName = models.CharField(max_length=100, null=True, blank=True)
    campaign = models.CharField(max_length=100, null=True, blank=True)
    list = models.CharField(max_length=100, null=True, blank=True)
    addedDate = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.firstName} {self.lastName}'