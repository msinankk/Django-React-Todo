"""
views.py

This module is used to register the viewset for api requests
"""
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.response import Response
from todoapp.api.serializers import TodoSerializer
from todoapp.api.filters import TodoFilter
from todoapp.models import Todo


class TodoViewSet(viewsets.ModelViewSet):
    """
    Class-based view set to manage CRUD o
    """

    queryset = Todo.objects.filter(is_active=True)
    serializer_class = TodoSerializer

    @action(detail=False, methods=["POST"])
    def search(self, request):
        """
        This method is used to search or filter the todos
        """
        # the data to filter
        filter_data = request.data
        filtered_queryset = TodoFilter(
            filter_data,
        ).qs
        serializer_context = {"request": request}
        serializer = TodoSerializer(
            filtered_queryset, many=True, context=serializer_context
        )
        return Response(serializer.data)

    def create(self, request, *_args, **_kwargs):
        """
        The create method to add the todo
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    @action(detail=True)
    def archive(self, _request, pk=None):
        """
        The archiving method to archive a todo
        """
        instance = self.get_object()
        instance.is_active = not instance.is_active
        instance.save()

        Todo.objects.filter(id=pk).update(is_active=False)

        return Response(status=status.HTTP_200_OK)

    def update(self, request, *_args, **_kwargs):
        """
        The update method is to update the todo
        """
        partial = _kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        """
        To update the instance
        """
        serializer.save()

    def delete(self, _request, *_args, **_kwargs):
        """
        This method is used to delete the todo instance
        """
        instance = self.get_object()
        self.perform_delete(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_delete(self, instance):
        """
        delete the instance
        """
        instance.delete()
