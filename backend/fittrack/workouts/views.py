from rest_framework import generics, permissions
from .models import Workouts
from .serializers import WorkoutSerializers

class WorkoutListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkoutSerializers
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workouts.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WorkoutDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutSerializers
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workouts.objects.filter(owner=self.request.user)
