from .models import ProductSku
from django.http import HttpResponse
from django.template import loader

from django.shortcuts import render

from django.core.paginator import Paginator

def index(request):
    return render(request, "index.html")