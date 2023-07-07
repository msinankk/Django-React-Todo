"""
serializer.py

This module is used to register serializers for models
"""
from rest_framework import  serializers
from todoapp.models import Todo


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    """
    Todo serializer class
    """

    class Meta:
        """
        class meta to add additional options
        """

        model = Todo
        fields = ("id", "url", "title", "description", "completed","is_active")
        read_only_fields = ("id",)
