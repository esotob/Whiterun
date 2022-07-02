from rest_framework import viewsets
from rest_framework import filters
from rest_framework import mixins, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from .models import Product
from .models import ProductSku
from .serializers import ProductSkuSerializer
from .serializers import ProductSerializer



class ProductResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'current_page': int(self.request.query_params.get('page', 1)),
            'total': self.page.paginator.count,
            'per_page': self.page_size,
            'total_pages': round(self.page.paginator.count/self.page_size, 0),
            'results': data,
        })

class ProductViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    """Viewset for Products"""
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = ProductResultsSetPagination
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

