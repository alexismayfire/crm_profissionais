from rest_framework.viewsets import ModelViewSet

from .models import Job,WorkerService,Worker,WorkerPortfolio,WorkerRole

from .serializers import JobSerializer,WorkerServiceSerializer,WorkerSerializer,WorkerRoleSerializer,WorkerPortfolioSerializer

class JobAPI(ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class WorkerServiceAPI(ModelViewSet):
    queryset = WorkerService.objects.all()
    serializer_class = WorkerServiceSerializer

class WorkerAPI(ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer

class WorkerRoleAPI(ModelViewSet):
    queryset = WorkerRole.objects.all()
    serializer_class = WorkerRoleSerializer

class WorkerPortfolioAPI(ModelViewSet):
    queryset = WorkerPortfolio.objects.all()
    serializer_class = WorkerPortfolioSerializer