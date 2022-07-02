from django.db import models
from django.core.validators import RegexValidator

class Product(models.Model):
    """Model for the products we are going to have"""
    item_name = models.CharField(max_length=30, unique=True)
    item_description = models.TextField()
    item_price = models.FloatField()
    item_cost = models.FloatField()
    item_pic = models.CharField(max_length=60)
    is_virtual = models.BooleanField(default = True)

class ProductSku(models.Model):
    """Model for the product sku"""
    barcode = models.CharField(max_length=10, unique=True)
    sku_code = models.CharField(max_length=20, unique=True)
    sku_price = models.FloatField()
    size = (
        ('XS', 'Extra small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', 'Extra extra Large'),
    )
    size_code= models.CharField(max_length=3, choices=size)
    product = models.ForeignKey(
        Product, related_name='skus', on_delete=models.PROTECT
        )
    color_code = models.CharField(max_length=3)
    color_code_desc = models.CharField(max_length=100)
    backordereable = models.BooleanField(default=True)





