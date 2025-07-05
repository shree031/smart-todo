from django.shortcuts import render

# Create your views here.
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
    queryset = ContextEntry.objects.all()
    serializer_class = ContextEntrySerializer

# Mock AI suggestion endpoint
@api_view(['POST'])
def get_ai_suggestions(request):
    return Response({
        "priority": 7,
        "deadline_days": 3,
        "enhanced_description": "This task is important and should be done in 3 days.",
        "tags": ["important", "urgent"]
    })
