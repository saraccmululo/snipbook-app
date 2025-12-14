from django.contrib import admin
from .models import Snippet, Tag

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
  list_display=['name']

@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
  list_display=['title', 'language', 'owner', 'favorite', 'created_at', 'updated_at']
  list_filter=['language', 'favorite', 'tags']
  search_fields=['title', 'description', 'code']

