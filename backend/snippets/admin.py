from django.contrib import admin
from .models import Snippet
@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
  list_display=['title', 'language', 'owner', 'favorite', 'created_at', 'updated_at']
  list_filter=['language', 'favorite']
  search_fields=['title', 'description', 'code']

