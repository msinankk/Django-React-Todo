"""
filters.py

This module is used to register FilterSet class for Todo model
"""
import django_filters
from django.db.models import Q
from todoapp.models import Todo


class TodoFilter(django_filters.FilterSet):
    """
    TodoFilter class
    """

    search = django_filters.CharFilter(method="search_todo")

    title = django_filters.CharFilter(lookup_expr="icontains")
    description = django_filters.CharFilter(lookup_expr="icontains")
    completed = django_filters.BooleanFilter()
    is_active = django_filters.BooleanFilter()

    class Meta:
        """
        Class meta to add additional options
        """

        model = Todo
        fields = ["search", "title", "completed", "description", "is_active"]

    def search_todo(self, queryset, _request, value):
        """
        Filter queryset by title or description.
        """
        queryset = queryset.filter(title__icontains=value) | queryset.filter(
            description__icontains=value
        )
        return queryset
