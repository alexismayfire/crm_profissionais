from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Job, Salon, WorkerService, Worker, WorkerRole, WorkerPortfolio
from django.contrib.contenttypes.models import ContentType
from flowit_crm.core.models import Audit

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

    def update(self, instance, validated_data):
        instance.about = validated_data.get("about")
        user = instance.user
        user_type = ContentType.objects.get(app_label="users", model="user")
        Audit.objects.create(
            object_id=user.pk, content_type=user_type, action="U", fields=["about"]
        )
        instance.save()
        return instance


class WorkerServiceSerializer(ModelSerializer):
    job = JobSerializer(many=False)
    worker_data = SerializerMethodField()
    # worker = WorkerSerializer()

    class Meta:
        model = WorkerService
        fields = [
            "id",
            "price",
            "time_spent",
            "is_owner",
            "job",
            "worker",
            "worker_data",
        ]

    def get_worker_data(self, obj):
        return {"id": obj.worker.id, "salon": obj.worker.salon}

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
