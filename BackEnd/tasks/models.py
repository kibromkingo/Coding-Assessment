from django.db import models

class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return self.name
