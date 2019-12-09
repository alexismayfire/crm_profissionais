from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Job, Salon, WorkerService, Worker, WorkerRole, WorkerPortfolio

class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = ["id", "name", "category"]


class SalonSerializer(ModelSerializer):
    class Meta:
        model = Salon
        fields = ["id", "name"]


class WorkerSerializer(ModelSerializer):
    salon = SalonSerializer()

    class Meta:
        model = Worker
        fields = ["id", "salon", "about", "user"]


class WorkerServiceSerializer(ModelSerializer):
    job = JobSerializer(many=False)
    worker = WorkerSerializer()
    class Meta:
        model = WorkerService
        fields = ["id", "price", "time_spent", "is_owner", "job", "worker"]

    def create(self, validated_data):
        job_data = validated_data.pop("job")
        job = Job.objects.create(**job_data)
        worker_service = WorkerService.objects.create(**validated_data, job=job)

        return worker_service

    def update(self, instance, validated_data):
        job = validated_data.get("job")
        instance.job.name = job.get("name")
        instance.job.category = job.get("category")
        instance.job.save()
        instance.save()

        return instance


class WorkerRoleSerializer(ModelSerializer):
    class Meta:
        model = WorkerRole
        fields = "__all__"


class WorkerPortfolioSerializer(ModelSerializer):
    class Meta:
        model = WorkerPortfolio
        fields = ["id", "photo", "worker"]
