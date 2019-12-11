from django.db.models import Q, Sum

from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters, status
from rest_framework.response import Response

from .models import Job, Salon, WorkerService, Worker, WorkerPortfolio, WorkerRole
from .serializers import (
    JobSerializer,
    SalonSerializer,
    WorkerServiceSerializer,
    WorkerSerializer,
    WorkerRoleSerializer,
    WorkerPortfolioSerializer,
)

class JobAPI(ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_queryset(self):
        # Só deve retornar instâncias que não são específicas de um profissional
        related_queryset = WorkerService.objects.filter(is_owner=True)
        related_ids = [obj.job_id for obj in related_queryset]

        # Aqui usa a negação, porque queremos todos os Jobs que não aparecem
        # na relação M2M WorkerService com is_owner=True
        # Isso indica, na prática, que esse Job não pode ser associado a outro Worker
        # Mas não lembro se existe como incluir essa restrição no Django / DB!
        return self.queryset.filter(~Q(pk__in=related_ids))


class WorkerServiceAPI(ModelViewSet):
    queryset = WorkerService.objects.all()
    serializer_class = WorkerServiceSerializer

    def get_queryset(self):
        if not self.request.user.is_anonymous:
            return self.queryset.filter(worker__user=self.request.user)

        return self.queryset

class BillingAPI(ModelViewSet):
    queryset = WorkerService.objects.all()
    serializer_class = WorkerServiceSerializer

    def get_queryset(self):
        return self.queryset.aggregate(Sum('price'))

class WorkerAPI(ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class WorkerRoleAPI(ModelViewSet):
    queryset = WorkerRole.objects.all()
    serializer_class = WorkerRoleSerializer


class WorkerPortfolioAPI(ModelViewSet):
    queryset = WorkerPortfolio.objects.all()
    serializer_class = WorkerPortfolioSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        worker = self.request.query_params.get("worker", None)
        if worker:
            return self.queryset.filter(worker_id=worker)

        return self.queryset


class SalonAPI(ModelViewSet):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer
