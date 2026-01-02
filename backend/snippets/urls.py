from django.urls import path
from .views import RegisterView, SnippetListCreateView, SnippetRetrieveUpdateDestroyView, RequestPasswordResetView, ResetPasswordConfirmView

urlpatterns = [
  path('register/', RegisterView.as_view(), name='register'),
  path('snippets/', SnippetListCreateView.as_view(), name='snippet-list-create'),
  path('snippets/<int:pk>/', SnippetRetrieveUpdateDestroyView.as_view(), name='snippet-detail'),
  path('reset-password/', RequestPasswordResetView.as_view(), name='reset-password'),
  path('reset-password/<str:token>/', ResetPasswordConfirmView.as_view(), name='reset-password-confirm'),
]
