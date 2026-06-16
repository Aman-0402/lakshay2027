from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    LabViewSet, BookingViewSet, TeamMemberViewSet, PartnerViewSet,
    RegisterView, LoginView, MeView,
)

router = DefaultRouter()
router.register('labs', LabViewSet)
router.register('bookings', BookingViewSet, basename='booking')
router.register('team', TeamMemberViewSet)
router.register('partners', PartnerViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/me/', MeView.as_view()),
] + router.urls
