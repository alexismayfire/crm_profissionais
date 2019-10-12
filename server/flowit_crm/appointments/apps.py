from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AppointmentsConfig(AppConfig):
    name = "flowit_crm.appointments"
    verbose_name = _("Appointments")

    def ready(self):
        try:
            import flowit_crm.appointments.signals  # noqa F401 pylint:disable=unused-import
        except ImportError:
            pass
