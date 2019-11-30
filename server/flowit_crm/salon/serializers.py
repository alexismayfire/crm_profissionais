from rest_framework.serializers import ModelSerializer
from .models import Job,WorkerService

class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = ['name', 'category']

class WorkerServiceSerializer(ModelSerializer):
    class Meta:
        model = WorkerService
        fields = ['price', 'time_spent']