from rest_framework import routers
from .api import WorkerServiceAPI,JobAPI

router = routers.SimpleRouter()
router.register(r'worker-service', WorkerServiceAPI)
router.register(r'job', JobAPI)
urlpatterns = router.urls