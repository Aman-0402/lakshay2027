from rest_framework.routers import DefaultRouter
from .views import LabViewSet, BookingViewSet, TeamMemberViewSet, PartnerViewSet

router = DefaultRouter()
router.register('labs', LabViewSet)
router.register('bookings', BookingViewSet)
router.register('team', TeamMemberViewSet)
router.register('partners', PartnerViewSet)

urlpatterns = router.urls
