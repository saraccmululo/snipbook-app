from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from. models import Snippet, Tag
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

#Serializers convert Python objects into JSON and validate incoming data from API requests.

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)#password is sent to the server, but wont't be returned to frontend.
  email = serializers.EmailField(required=True)#email is mandatory

  class Meta:
    model = User
    fields = ['username', 'email', 'password']#These are the fields the frontend will send when registering a user.

  def validate_email(self, value):
    value = value.lower().strip()
    if User.objects.filter(email=value).exists():
      raise serializers.ValidationError("Email already in use.")
    return value

  def create(self, validated_data):
    user = User.objects.create_user(
      username = validated_data['username'],
      email=validated_data['email'],
      password=validated_data['password']
    )
    return user
  
  def to_representation(self, instance):
    return {
      "id": instance.id,
      "username":instance.username,
      "email": instance.email,
    }

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
        tag_name = t['name'].lower()
        tag_obj,_=Tag.objects.get_or_create(name=tag_name)
        snippet.tags.add(tag_obj)
    return snippet

  def update(self, snippet, validated_data): #snippet is the snippet obj to be updated
    
    tags_data=validated_data.pop('tags', None)
    print(snippet)

    #.items() allows iterate over each key-value pair in a dict
    for key, value in validated_data.items():
      setattr(snippet, key, value) #setattr receives the snippet obj to be updated, the name of the key and the new value.

    #If tags is provided, delete old tags
    if tags_data is not None:
      snippet.tags.clear()
    
      

    #Loop over new tag obj and add it to the snippet obj
      for t in tags_data:
        tag_name = t['name'].lower()
        #tag_obj,_=Tag.objects.get_or_create(name=tag_name)
        #print(tag_obj)
   
        #snippet.tags.add(tag_obj)

    snippet.save()
    return snippet


"""

  def create(self, validated_data):
    tags_data = validated_data.pop('tags', [])
    snippet = Snippet.objects.create(**validated_data)

    for tag_name in tags_data:
      tag_obj, _ = Tag.objects.get_or_create(name=tag_name)
      snippet.tags.add(tag_obj)
    return snippet

  def update(self, snippet, validated_data):
    tags_data = validated_data.pop('tags', None)
    for key, value in validated_data.items():
      setattr(snippet, key, value)
      
    if tags_data is not None:
      snippet.tags.clear()
      for tag_name in tags_data:
        tag_obj, _ = Tag.objects.get_or_create(name=tag_name)
        print(tag_obj)
        snippet.tags.add(tag_obj)

    snippet.save()
    return snippet

"""

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  username_field = 'email'
  def validate(self, attrs):
    print("attrs:", attrs)
    email = attrs.get("email")
    password = attrs.get("password")

    if not email or not password:
      raise serializers.ValidationError("Both email and password are required.")

    # Find the user by email
    try:
      user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
      raise serializers.ValidationError({"email": "No user found with this email."})

    # Authenticate using the username (not email!) and password
    user = authenticate(username=user_obj.username, password=password)
    if not user:
      raise serializers.ValidationError({"password": "Incorrect password."})

    # Manually generate tokens
    refresh = RefreshToken.for_user(user)
    data = {
      "refresh": str(refresh),
      "access": str(refresh.access_token),
      "user": {
      "id": user.id,
      "username": user.username,
      "email": user.email,
      },
    }
    return data