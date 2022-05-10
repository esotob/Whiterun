from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.response import Response

from product import serializers
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)

        return Response(serializer.data)

    #def retrieve(self, request, pk=None):
    #    queryset = Product.objects.all()
    #    user = get_object_or_404(queryset, pk=pk)
    #    serializer = ProductSerializer(user)
    #    return Response(serializer.data)