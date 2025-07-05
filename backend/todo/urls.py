from django.urls import path
from .views import TaskListCreate, CategoryList, ContextEntryListCreate, get_ai_suggestions

urlpatterns = [
    path('tasks/', TaskListCreate.as_view()),
    path('categories/', CategoryList.as_view()),
    path('contexts/', ContextEntryListCreate.as_view()),
    path('ai/suggest/', get_ai_suggestions),
]
