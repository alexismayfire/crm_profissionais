from rest_framework.serializers import ModelSerializer
from .models import Appointment,AppointmentNote
from flowit_crm.users.serializers import UserSerializer

class AppointmentSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Appointment
        fields = ["user", "with_person", "service", "start_time", "end_time", "note"]

class AppointmentNoteSerializer(ModelSerializer):
    class Meta:
        model = AppointmentNote
        fields = "__all__"

