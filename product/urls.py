from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import ProductViewSet
from .views import ProductSkuViewSet

router = DefaultRouter()
router.register('product', ProductViewSet, basename='product-viewset')
router.register('product-sku', ProductSkuViewSet, basename='product-sku-viewset')


urlpatterns = [
    path('', include(router.urls))
]