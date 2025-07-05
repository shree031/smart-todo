from django.urls import path
from .views import TaskListCreate, CategoryList, ContextEntryListCreate, CategoryListCreate, ai_suggestion

urlpatterns = [
    path('tasks/', TaskListCreate.as_view()),
    path('categories/', CategoryListCreate.as_view()),
    path('contexts/', ContextEntryListCreate.as_view()), 
    path('ai/suggest/', ai_suggestion)
]
