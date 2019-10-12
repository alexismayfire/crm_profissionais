from rest_framework.viewsets import GenericViewSet

from .models import Worker


class SalonAPI(GenericViewSet):
    @staticmethod
    def get_worker_by_id(pk):
        return Worker.objects.get(pk=pk)
