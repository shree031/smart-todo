from django.urls import path
from .views import TaskListCreate, TaskDetail, CategoryList, ContextEntryListCreate, CategoryListCreate, ai_suggestion

urlpatterns = [
    path('tasks/', TaskListCreate.as_view()),         # GET, POST
    path('tasks/<int:id>/', TaskDetail.as_view()),    # GET, PUT, DELETE for a task by ID
    path('categories/', CategoryList.as_view()),
    path('categories/create/', CategoryListCreate.as_view()),
    path('contexts/', ContextEntryListCreate.as_view()),
    path('ai/suggest/', ai_suggestion)
]
