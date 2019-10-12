from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class CommunicationConfig(AppConfig):
    name = "flowit_crm.communication"
    verbose_name = _("Communication")

    def ready(self):
        try:
            import flowit_crm.communication.signals  # noqa F401 pylint:disable=unused-import
        except ImportError:
            pass
