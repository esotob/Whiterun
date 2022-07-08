from .models import Location
from django.http import HttpResponse
from django.template import loader

from django.shortcuts import render

from django.core.paginator import Paginator

def location(request):
    return render(request, "location.html")
