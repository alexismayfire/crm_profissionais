from django.contrib.auth import get_user_model
from django.conf import settings
from django.db.models import (
    PROTECT,
    SET_NULL,
    DateTimeField,
    ForeignKey,
    Model,
    TextField,
)
from django.utils.translation import ugettext_lazy as _


user_model = get_user_model()


class Appointment(Model):
    user = ForeignKey(
        user_model,
        verbose_name=_("User"),
        on_delete=PROTECT,
        related_name="my_appointments",
    )
    with_person = ForeignKey(
        user_model,
        verbose_name=_("With Person"),
        on_delete=PROTECT,
        related_name="my_service_appointments",
    )
    # https://stackoverflow.com/questions/1419442/how-to-model-a-foreign-key-in-a-reusable-django-app
    service = ForeignKey(
        settings.APPOINTMENTS_SERVICE_MODEL,
        verbose_name=_("Appointment Service"),
        on_delete=PROTECT,
    )
    start_time = DateTimeField(verbose_name=_("Start Time"))
    end_time = DateTimeField(verbose_name=_("End Time"))
    note = ForeignKey(
        "AppointmentNote", verbose_name=_("Note"), on_delete=SET_NULL, null=True
    )


class AppointmentNote(Model):
    content = TextField(verbose_name=_("Note Content"))
