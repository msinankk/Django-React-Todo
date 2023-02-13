from rest_framework import viewsets,serializers
from todoapp.models import Todo



class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'url', 'title', 'description', 'completed')
        read_only_fields = ('id',)


