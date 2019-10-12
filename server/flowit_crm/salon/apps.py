from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class SalonConfig(AppConfig):
    name = "flowit_crm.salon"
    verbose_name = _("Salon")

    def ready(self):
        try:
            import flowit_crm.salon.signals  # noqa F401 pylint:disable=unused-import
        except ImportError:
            pass
