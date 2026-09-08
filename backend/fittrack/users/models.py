from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    
    height = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # cm
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # kg
    age = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return self.username
