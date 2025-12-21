from django.shortcuts import render
from rest_framework import generics, permissions, filters
from .models import Snippet
from .serializers import SnippetSerializer, RegisterSerializer, MyTokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication


#Register the user
class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    permission_classes = [permissions.AllowAny] 
    serializer_class = RegisterSerializer


# List all snippets or create a new snippet
class SnippetListCreateView(generics.ListCreateAPIView):
    serializer_class = SnippetSerializer #Convert model → JSON for GET. Convert JSON → model for POST/PUT
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'code', 'tags__name', 'language']
    ordering_fields = ['created_at', 'updated_at', 'title']

    def get_queryset(self):#get all snippets from a particular owner
        return Snippet.objects.filter(owner=self.request.user).prefetch_related('tags')

    def perform_create(self, serializer): #add the owner when creating a new snippet
        serializer.save(owner=self.request.user)

# Retrieve, update, or delete a specific snippet
class SnippetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SnippetSerializer
    permission_classes = [permissions.IsAuthenticated]#only logged in users can retrieve/update/delete

    def get_queryset(self):
        return Snippet.objects.filter(owner=self.request.user).prefetch_related('tags') #only owner can modify their snippets.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer


