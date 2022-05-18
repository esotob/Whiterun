from rest_framework import viewsets
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication

from .models import Product
from .models import ProductSku
from .serializers import ProductSkuSerializer
from .serializers import ProductSerializer



class ProductViewSet(viewsets.ModelViewSet):
    """Viewset for Products"""
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('item_name',)

class ProductSkuViewSet(viewsets.ModelViewSet):
    """Viewset for SKU Products"""
    serializer_class = ProductSkuSerializer
    queryset = ProductSku.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('item_name',)
