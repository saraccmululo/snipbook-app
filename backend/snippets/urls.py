from django.urls import path
from .views import SnippetListCreateView, SnippetRetrieveUpdateDestroyView, RegisterView

urlpatterns = [
  path('register/', RegisterView.as_view(), name='register'),
  path('snippets/', SnippetListCreateView.as_view(), name='snippet-list-create'),
  path('snippets/<int:pk>/', SnippetRetrieveUpdateDestroyView.as_view(), name='snippet-detail'),
]
