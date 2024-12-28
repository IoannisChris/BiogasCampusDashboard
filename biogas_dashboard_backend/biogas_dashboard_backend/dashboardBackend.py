# dashboard/models.py
from django.db import models

class WasteInput(models.Model):
    waste_type = models.CharField(max_length=100)
    volume = models.FloatField()
    date_added = models.DateTimeField(auto_now_add=True)

class EnergyOutput(models.Model):
    energy_type = models.CharField(max_length=100)
    amount = models.FloatField()
    date_recorded = models.DateTimeField(auto_now_add=True)

class SystemHealth(models.Model):
    status = models.CharField(max_length=50)
    last_checked = models.DateTimeField(auto_now_add=True)
