from django.db import models
from django.conf import settings
# Create your models here.

class Workouts(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="workouts"
    )
    date = models.DateField()
    muscle_group = models.CharField(max_length=200)
    exercises = models.JSONField()
    notes = models.TextField(blank=True,null=True)

def __str__(self):
    return f"{self.muscle_group} - {self.date}"