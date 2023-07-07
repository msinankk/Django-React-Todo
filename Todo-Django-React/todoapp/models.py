"""
models.py

This module is used to register django models
"""
from django.db import models

# Create your models here.


class Todo(models.Model):
    """
    Todo model
    """

    title = models.CharField(max_length=20)
    description = models.TextField()
    completed = models.BooleanField()

    def __str__(self) -> str:
        return self.todo

    class Meta:
        """
        Meta class to add additional options
        """

        ordering = ["-id"]
