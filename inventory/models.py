from django.db import models

from product.models import ProductSku

class Inventory (models.Model):
    """Model for the inventory for each sku"""
    product_sku = models.ForeignKey(
        ProductSku, on_delete=models.PROTECT,
        blank=False, null=False
    )
    qty_reserve = models.IntegerField(default=0)
    qty_active = models.IntegerField(default=0)
    qty_allocated = models.IntegerField(default=0)
    qty_packed = models.IntegerField(default=0)
    qty_shipped = models.IntegerField(default=0)

class Location (models.Model):
    """Model for the locations"""
    product_sku = models.ForeignKey(
        ProductSku, on_delete=models.PROTECT,
        default=None, blank=True, null=True
    )
    coordinate = models.CharField(max_length=5, unique=True)
    type = models.CharField(max_length=10)
    location_qty = models.IntegerField(default=0)
    available = models.BooleanField(default=True)

class Transaction (models.Model):
    product_sku = models.ForeignKey(
        ProductSku, on_delete=models.PROTECT,
        blank=False, null=False
    )
    user = models.CharField(max_length=20)
    transaction_type = models.CharField(max_length=20)
    date = models.DateTimeField()
    transaction_qty = models.IntegerField(default=0)
    reason = models.CharField(max_length=100)
