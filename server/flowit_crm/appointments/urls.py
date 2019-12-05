from rest_framework import routers
from .api import AppointmentAPI,AppointmentNoteAPI

router = routers.SimpleRouter()
router.register(r"appointment", AppointmentAPI)
router.register(r"appointment-note", AppointmentNoteAPI)
urlpatterns = router.urls