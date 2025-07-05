from django.shortcuts import render

import random

from rest_framework import generics
from .models import Task, Category, ContextEntry
from .serializers import TaskSerializer, CategorySerializer, ContextEntrySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ContextEntryListCreate(generics.ListCreateAPIView):
    queryset = ContextEntry.objects.all().order_by('-timestamp')
    serializer_class = ContextEntrySerializer


class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer




@api_view(['POST'])
def ai_suggestion(request):
    # Mock AI logic
    title = request.data.get('title', '')
    description = request.data.get('description', '')

    # Mocked logic based on keywords
    if "urgent" in description.lower():
        days = 1
        priority = 5
    elif "week" in description.lower():
        days = 7
        priority = 3
    else:
        days = random.randint(2, 5)
        priority = 2

    return Response({
        "priority": priority,
        "deadline_days": days,
        "tags": ["auto", "ai"],
        "enhanced_description": f"{description} (analyzed)"
    })

