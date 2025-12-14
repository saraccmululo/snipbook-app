from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from. models import Snippet, Tag
from django.contrib.auth.models import User
#Serializers convert Python objects into JSON and validate incoming data from API requests.

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)#password is sent to the server, but wont't be returned to frontend.

  class Meta:
    model = User
    fields = ['username', 'email', 'password']#These are the fields the frontend will send when registering a user.

  def create(self, validated_data):
    user = User.objects.create_user(
      username = validated_data['username'],
      email=validated_data.get('email', ''),
      password=validated_data['password']
    )
    return user



class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = ['id', 'name']



class SnippetSerializer(serializers.ModelSerializer):
  tags = TagSerializer(many=True, required=False) #many=True means tags will always be a list (even if empty)
  owner = serializers.ReadOnlyField(source='owner.username')

  class Meta:
    model = Snippet
    fields = [
      "id",
      "owner",
      "title",
      "language",
      "tags",
      "description",
      "code",
      "favorite",
      "created_at",
      "updated_at"
    ]
  
  def create(self, validated_data):
    #Remove tag from data
    tags_data = validated_data.pop('tags', None)

    #create snippet object without tag
    snippet = Snippet.objects.create(**validated_data)

    #if tag is provided, 
    if tags_data is not None:
    #create tag obj and add it back into snippet obj
      for t in tags_data:
        tag_obj,_=Tag.objects.get_or_create(name=t['name'])
        snippet.tags.add(tag_obj)
    return snippet

  def update(self, snippet, validated_data): #snippet is the snippet obj to be updated
    tags_data=validated_data.pop('tags', None)

    #.items() allows iterate over each key-value pair in a dict
    for key, value in validated_data.items():
      setattr(snippet, key, value) #setattr receives the snippet obj to be updated, the name of the key and the new value.

    #If tags is provided, delete old tags
    if tags_data is not None:
      snippet.tags.clear()

    #Loop over new tag obj and add it to the snippet obj
      for t in tags_data:
        tag_obj,_ = Tag.objects.get_or_create(name=t['name'])
        snippet.tags.add(tag_obj)

    snippet.save()
    return snippet
  

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token= super().get_token(user)
  
    token['username'] = user.username
    token['email'] = user.email
    token['user_id'] = user.id
    return token