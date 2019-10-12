from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class CoreConfig(AppConfig):
    name = "flowit_crm.core"
    verbose_name = _("Core")

    def ready(self):
        try:
            import flowit_crm.core.signals  # noqa F401 pylint:disable=unused-import
        except ImportError:
            pass
