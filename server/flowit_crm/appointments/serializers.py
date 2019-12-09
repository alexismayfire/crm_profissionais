from rest_framework.serializers import ModelSerializer
from .models import Appointment, AppointmentNote
from flowit_crm.users.serializers import UserAppointmentSerializer


class AppointmentSerializer(ModelSerializer):
    user = UserAppointmentSerializer()

    class Meta:
        model = Appointment
        fields = ["user", "with_person", "service", "start_time", "end_time", "note"]


class AppointmentNoteSerializer(ModelSerializer):
    class Meta:
        model = AppointmentNote
        fields = "__all__"

