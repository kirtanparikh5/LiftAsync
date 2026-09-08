from datetime import date
from rest_framework import serializers
from .models import Workouts

class WorkoutSerializers(serializers.ModelSerializer):

    class Meta:
        model = Workouts
        fields = '__all__'
        read_only_fields = ("owner",)  # owner set automatically

    def validate_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Workout date cannot be in the future.")
        return value