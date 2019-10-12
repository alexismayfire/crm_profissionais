from .interfaces import SalonInterface
from .models import Appointment


class AppointmentService:
    @staticmethod
    def create_appointment(obj):
        worker = SalonInterface.get_worker_by_id(obj["person_id"])
        new_appointment = Appointment.objects.create(
            user_id=obj["user_id"], with_person=worker
        )

        return new_appointment
