from django.urls import path

from . import views


urlpatterns = [
    path('list/', views.ProductViewSet.as_view({'get': 'list'}))
]