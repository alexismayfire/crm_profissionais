from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters

from .serializers import AppointmentSerializer, AppointmentNoteSerializer
from .services import AppointmentService
from .models import Appointment, AppointmentNote


class AppointmentAPI(ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):        
        if self.request.is_customer:
            return self.queryset.filter(appointment__user=self.request.user)
        else:
            # Lista de clientes
            return self.queryset.filter(appointment__with_person=self.request.user).distinct('user')
        return self.queryset

class AppointmentNoteAPI(ModelViewSet):
    queryset = AppointmentNote.objects.all()
    serializer_class = AppointmentNoteSerializer
