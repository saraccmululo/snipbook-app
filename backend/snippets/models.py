from django.db import models
from django.contrib.auth import get_user_model

User= get_user_model()

class Tag(models.Model):
  name = models.CharField(max_length=50, unique=True)

  def __str__(self):
    return self.name
  

class Snippet(models.Model):
  owner=models.ForeignKey(User, on_delete=models.CASCADE, related_name="snippets")
  title = models.CharField(max_length=200)
  language = models.CharField(max_length=50)
  description = models.TextField(blank=True)
  code=models.TextField()
  tags=models.ManyToManyField(Tag, blank=True, related_name="snippets")
  favorite = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


  class Meta:
    ordering = ['-created_at']

  def __str__(self):
    return f"{self.title} - {self.language}"