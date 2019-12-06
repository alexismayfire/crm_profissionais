from django.db.models import Q

from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters, status

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


class WorkerAPI(ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['job__category']


class WorkerRoleAPI(ModelViewSet):
    queryset = WorkerRole.objects.all()
    serializer_class = WorkerRoleSerializer


class WorkerPortfolioAPI(ModelViewSet):
    queryset = WorkerPortfolio.objects.all()
    serializer_class = WorkerPortfolioSerializer
    permission_classes = [IsAuthenticated, ]
    # parser_class = [MultiPartParser, ]

    def get_queryset(self):
        if not self.request.user.is_customer:
            return self.queryset.filter(worker=self.request.user.worker_set.first())

        return self.queryset

    def create(self, request, *args, **kwargs):
        print(request.data)
        # print(request.FILES)
        data = {
            'photos': request.data['photos'],
            'worker': self.request.user.worker_set.first()
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class SalonAPI(ModelViewSet):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer
