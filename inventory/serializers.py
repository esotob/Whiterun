from product import models
from product.models import ProductSku
from inventory import models
from .models import Location
from .models import Inventory
from .models import Transaction
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

class LocationSerializer (serializers.Serializer):
    product_sku = serializers.CharField(source="product_sku.barcode", required=False)
    coordinate = serializers.CharField(max_length=5)
    type = serializers.CharField(max_length=10)
    location_qty = serializers.IntegerField(default=0)
    available = serializers.BooleanField(default=True)

    def create(self, validated_data):
        product_sku = "product_sku"
        if product_sku in validated_data:
            product_sku = validated_data.pop("product_sku")
            sku_barcode = product_sku.pop("barcode")

            product_sku = ProductSku.objects.filter(
                barcode = sku_barcode
            ).first()

            if not product_sku:
                raise serializers.ValidationError("Barcode '{}' not found, please insert a correct one or empty space for empty location ".format(sku_barcode))
        else:
            product_sku = None

        validated_data["product_sku"] = product_sku

        coordinate_repeat = Location.objects.filter(coordinate=validated_data.get("coordinate")).first()
        if coordinate_repeat is not None:
            raise serializers.ValidationError("The coordinate name {} already exist".format(coordinate_repeat.coordinate))

        return Location.objects.create(**validated_data)

    class Meta:
        model = Location
        fields = ['product_sku', 'coordinate', 'type', 'location_qty', 'available']

class InventorySerializer (serializers.Serializer):
    product_sku = serializers.CharField(source="product_sku.id", required=True)
    qty_reserve = serializers.IntegerField(default=0)
    qty_active = serializers.IntegerField(default=0)
    qty_allocated = serializers.IntegerField(default=0)
    qty_packed = serializers.IntegerField(default=0)
    qty_shipped = serializers.IntegerField(default=0)

    def create(self, validated_data):
        return Inventory.objects.create(**validated_data)

    class Meta:
        model = Inventory
        fields = ['product_sku', 'qty_reserve', 'qty_active', 'qty_allocated', 'qty_packed', 'qty_shipped']