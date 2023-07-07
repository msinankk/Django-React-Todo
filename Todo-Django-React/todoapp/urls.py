"""
urls.py

This module is used to register api with ViewSet classes
"""
from rest_framework import routers
from django.urls import path, include
from todoapp.api import views
from todoapp.api.views import TodoViewSet


router = routers.DefaultRouter()
router.register(r"todos", TodoViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
