from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .api_views import LocationViewSet
from . import views

router = DefaultRouter()
router.register('location', LocationViewSet, basename='location-viewset')

urlpatterns = [
    path('', include(router.urls)),
    ]