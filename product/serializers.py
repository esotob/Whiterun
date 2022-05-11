from contextlib import nullcontext
from itertools import product
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

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.item_description = validated_data.get('item_description', instance.item_description)
        instance.save()
        return instance


    class Meta:
        model = Product
        fields = ['id', 'item_name', 'item_price', 'item_description', 'item_price', 'item_cost', 'item_pic', 'is_virtual']