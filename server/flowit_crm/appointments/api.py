from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.viewsets import ModelViewSet

from .serializers import AppointmentSerializer, AppointmentNoteSerializer
from .services import AppointmentService
from .models import Appointment, AppointmentNote


class AppointmentAPI(ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        if not self.request.user.is_anonymous:        
            if self.request.user.is_customer:
                return self.queryset.filter(user=self.request.user)
            else:
                # Lista de clientes
                return self.queryset.filter(with_person=self.request.user).distinct('user')
        return self.queryset

class AppointmentNoteAPI(ModelViewSet):
    queryset = AppointmentNote.objects.all()
    serializer_class = AppointmentNoteSerializer
