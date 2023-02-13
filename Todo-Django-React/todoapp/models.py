from django.db import models

# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
    completed = models.BooleanField()

    def __str__(self) -> str:
        return self.todo
        