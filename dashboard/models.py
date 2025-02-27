from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

class EnergyData(models.Model):
    timestamp = models.DateTimeField(default=now)  # Stores time of data entry
    waste_input = models.FloatField()  # Tons of waste
    energy_output = models.FloatField()  # Energy output in kWh
    methane_prevented = models.FloatField()  # Methane prevented in kg

    def __str__(self):
        return f"{self.timestamp}: {self.energy_output} kWh"
