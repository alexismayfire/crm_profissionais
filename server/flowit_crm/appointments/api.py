from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.viewsets import ViewSet

from .serializers import AppointmentSerializer
from .services import AppointmentService


class AppointmentViewSet(ViewSet):
    serializer = AppointmentSerializer

    def list(self):
        pass

    def retrieve(self):
        pass

    def create(self, request, *args, **kwargs):
        obj = {}
        if self.serializer.validate():
            obj = AppointmentService.create_appointment(self.serializer.data)
        return Response(data=obj, status=HTTP_201_CREATED)

    def delete(self):
        pass
