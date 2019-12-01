from rest_framework.serializers import ModelSerializer
from .models import Job,WorkerService,Worker,WorkerRole,WorkerPortfolio

class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = ['name', 'category']

class WorkerServiceSerializer(ModelSerializer):
    class Meta:
        model = WorkerService
        fields = ['price', 'time_spent']

class WorkerSerializer(ModelSerializer):
    class Meta:
        model = Worker
        fields = '__all__'

class WorkerRoleSerializer(ModelSerializer):
    class Meta:
        model = WorkerRole
        fields = '__all__'

class WorkerPortfolioSerializer(ModelSerializer):
    class Meta:
        model = WorkerPortfolio
        fields = '__all__'