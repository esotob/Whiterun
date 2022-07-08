from rest_framework import viewsets
from rest_framework import filters
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from .models import Location
from .models import Inventory
from .models import Transaction
from product.models import ProductSku

from .serializers import LocationSerializer
from .serializers import InventorySerializer

class LocationViewSet(viewsets.ModelViewSet):
    """Viewset for Location"""
    serializer_class = LocationSerializer
    queryset = Location.objects.all()
    authentication_classes = (TokenAuthentication,)
    filter_backends = (filters.SearchFilter,)