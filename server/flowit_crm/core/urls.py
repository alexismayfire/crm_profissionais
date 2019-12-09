from django.urls import path

from rest_framework import routers

from .api import AuditAPI

router = routers.SimpleRouter()
router.register(r"audit", AuditAPI)
urlpatterns = router.urls
