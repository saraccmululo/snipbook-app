from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from. models import Snippet
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

class SnippetSerializer(serializers.ModelSerializer):
  owner = serializers.ReadOnlyField(source='owner.username')
  class Meta:
    model = Snippet
    fields = [
      "id",
      "owner",
      "title",
      "language",
      "description",
      "code",
      "favorite",
      "created_at",
      "updated_at"
    ]
  #cleaning data before saving
  def validate_title(self, value):
    return value.strip()

  def validate_language(self, value):
    return value.strip().lower()

  def validate_description(self, value):
    return value.strip()
  
  #Capitalize language before sending to frontend
  def to_representation(self, instance):
    data = super().to_representation(instance)

    language = data.get("language")
    if language:
        lower =language.lower()
        upper_case_languages = {"css", "html", "sql", "jsx", "php", "json", "api"}

        if lower in upper_case_languages:
            data["language"] = lower.upper()
        else:
            data["language"] = lower.capitalize()

    return data
  
  def create(self, validated_data):
    #create snippet object 
    snippet = Snippet.objects.create(**validated_data)
    return snippet

  def update(self, snippet, validated_data): #snippet is the snippet obj to be updated
    #.items() allows iterate over each key-value pair in a dict
    for key, value in validated_data.items():
      setattr(snippet, key, value) #setattr receives the snippet obj to be updated, the name of the key and the new value.
    snippet.save()
    return snippet

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
      "username": user.username, #for my auth purposes
      "email": user.email,
      "display_name": user.username, #to show username in the UI
      },
    }
    return data