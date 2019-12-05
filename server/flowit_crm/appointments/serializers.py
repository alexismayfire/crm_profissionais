from rest_framework.serializers import ModelSerializer
from .models import Appointment,AppointmentNote


class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

class AppointmentNoteSerializer(ModelSerializer):
    class Meta:
        model = AppointmentNote
        fields = "__all__"

