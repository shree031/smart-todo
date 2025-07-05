from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    usage_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100, blank=True)
    priority_score = models.IntegerField(null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



class ContextEntry(models.Model):
    content = models.TextField()
    source_type = models.CharField(max_length=50)  # e.g. WhatsApp, email, note
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source_type}: {self.content[:30]}"

