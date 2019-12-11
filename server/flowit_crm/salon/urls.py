from rest_framework import routers
from .api import WorkerServiceAPI, JobAPI, WorkerAPI, WorkerRoleAPI, WorkerPortfolioAPI, SalonAPI, BillingAPI

router = routers.SimpleRouter()
router.register(r"worker-service", WorkerServiceAPI)
router.register(r"job", JobAPI)
router.register(r"worker", WorkerAPI)
router.register(r"worker-role", WorkerRoleAPI)
router.register(r"worker-portfolio", WorkerPortfolioAPI)
router.register(r"salon", SalonAPI)
router.register(r"billing", BillingAPI)
urlpatterns = router.urls
