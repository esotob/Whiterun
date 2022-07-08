from ast import Not
from contextlib import nullcontext
from product import models
from.models import Product
from.models import ProductSku
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

class ProductSkuSerializer (serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    barcode = serializers.CharField(max_length=10)
    sku_code = serializers.CharField(max_length=20)
    sku_price = serializers.FloatField()
    size_code= serializers.CharField(max_length=3)
    item_name = serializers.CharField(source="product.item_name")
    color_code = serializers.CharField(max_length=3)
    color_code_desc = serializers.CharField(max_length=100)
    backordereable = serializers.BooleanField(default=True)

    def create(self, validated_data):

        product = validated_data.pop('product')
        item_name = product.pop('item_name')

        product = Product.objects.filter(
            item_name=item_name
        ).first()

        validated_data['product'] = product

        if not product:
            raise serializers.ValidationError("Item '{}' Not Found".format(item_name))

        barcode_repeat = ProductSku.objects.filter(barcode=validated_data.get("barcode")).first()
        if barcode_repeat is not None:
            raise serializers.ValidationError("Sku barcode '{}' Already Exists".format(barcode_repeat.barcode))

        sku_code_repeat = ProductSku.objects.filter(sku_code=validated_data.get("sku_code")).first()
        if sku_code_repeat is not None:
            raise serializers.ValidationError("Sku code '{}' Already Exists".format(sku_code_repeat.sku_code))
        
        return ProductSku.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.sku_price = validated_data.get('sku_price', instance.sku_price)
        instance.size_code = validated_data.get('size_code', instance.size_code)
        instance.color_code = validated_data.get('color_code', instance.color_code)
        instance.color_code_desc = validated_data.get('color_code_desc', instance.color_code_desc)
        instance.backordereable = validated_data.get('backordereable', instance.backordereable)
        instance.save()
        return instance

    class Meta:
        model = ProductSku
        fields = ['id', 'barcode', 'sku_code', 'sku_price', 'size_code', 'item_name', 'color_code', 'backordereable']

class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    item_name = serializers.CharField(required=True)
    item_description = serializers.CharField(required=False)
    item_price = serializers.FloatField(required=True)
    item_cost = serializers.FloatField(required=True)
    item_pic = serializers.CharField(required=False)
    is_virtual = serializers.BooleanField(required=True)
    skus = ProductSkuSerializer(many=True, read_only=True)

    def create(self, validated_data):
        
        old_product = Product.objects.filter(item_name=validated_data.get("item_name")).first()
        if old_product is not None:
            raise serializers.ValidationError("Item '{}' Already Exists".format(old_product.item_name))
        return Product.objects.create(**validated_data)   

    def update(self, instance, validated_data):
        instance.item_description = validated_data.get('item_description', instance.item_description)
        instance.save()
        return instance


    class Meta:
        model = Product
        fields = ['id', 'item_name', 'item_price', 'item_description', 'item_price', 'item_cost', 'item_pic', 'is_virtual']