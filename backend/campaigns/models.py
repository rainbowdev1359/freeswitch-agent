from django.db import models

class Agent(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Campaign(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    agents = models.ManyToManyField(Agent)
    dials = models.IntegerField()
    list = models.CharField(max_length=100)
    pickups = models.IntegerField()
    failed = models.IntegerField()
    busy = models.IntegerField()
    amount_spent = models.DecimalField(max_digits=10, decimal_places=2)
    outcome = models.CharField(max_length=100)
    costOutcome = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name