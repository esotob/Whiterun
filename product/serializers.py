from contextlib import nullcontext
from product import models
from.models import Product
from rest_framework import serializers

class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    item_name = serializers.CharField(required=True)
    item_description = serializers.CharField(required=False)
    item_price = serializers.FloatField(required=True)
    item_cost = serializers.FloatField(required=True)
    item_pic = serializers.CharField(required=False)
    is_virtual = serializers.BooleanField(required=True)

    class Meta:
        model = Product
        fields = ['id', 'item_name', 'item_price', 'item_description', 'item_price', 'item_cost', 'item_pic', 'is_virtual']