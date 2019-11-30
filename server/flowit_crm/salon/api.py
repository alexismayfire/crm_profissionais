from rest_framework.viewsets import ModelViewSet

from .models import Job,WorkerService

from .serializers import JobSerializer,WorkerServiceSerializer

class JobAPI(ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class WorkerServiceAPI(ModelViewSet):
    queryset = WorkerService.objects.all()
    serializer_class = WorkerServiceSerializer

