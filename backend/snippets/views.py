from django.shortcuts import render
from rest_framework import generics, permissions, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Snippet
from .serializers import SnippetSerializer, RegisterSerializer, MyTokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

from sib_api_v3_sdk import Configuration, ApiClient, TransactionalEmailsApi
from sib_api_v3_sdk.models import SendSmtpEmail
from django.conf import settings

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
    search_fields = ['title', 'description', 'code', 'language']
    ordering_fields = ['created_at', 'updated_at', 'title']

    def get_queryset(self):#get all snippets from a particular owner
        return Snippet.objects.filter(owner=self.request.user)

    def perform_create(self, serializer): #add the owner when creating a new snippet
        serializer.save(owner=self.request.user)

# Retrieve, update, or delete a specific snippet
class SnippetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SnippetSerializer
    permission_classes = [permissions.IsAuthenticated]#only logged in users can retrieve/update/delete

    def get_queryset(self):
        return Snippet.objects.filter(owner=self.request.user) #only owner can modify their snippets.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer


class RequestPasswordResetView(APIView):
  permission_classes = [permissions.AllowAny]
  def post(self, request):
    email=request.data.get("email")
    print("DEBUG: email received:", email) 
    
    if not email:
      return Response({"error": "Email is required"},
      status=status.HTTP_400_BAD_REQUEST
      )
    try:
      user=User.objects.get(email=email)
      print("DEBUG: user found:", user)
    except User.DoesNotExist:
      return Response(
         {"message": "If that email exists, a rest link was sent."},
          status=status.HTTP_200_OK
      )
    token_generator = PasswordResetTokenGenerator()
    token = token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    reset_link = f"http://localhost:5173/reset-password/submit?uid={uid}&token={token}"
    print("DEBUG: reset link:", reset_link)

    try:
       send_reset_password_email(email, reset_link)
    except Exception as e:
       print("ERROR sending email:", e)  
       return Response({"error":f"Failed to send email:{str(e)}"}, status=500)
       
    return Response({
       "message": "If that email exists, a reset link was sent. Please check your email.",
    }, status=status.HTTP_200_OK)

class ResetPasswordConfirmView(APIView):
   permission_classes = [permissions.AllowAny]

   def post(self, request, token):
      password=request.data.get("password")
      uid = request.data.get("uid")

      if not password or not uid:
        return Response({"error":"Password and uid are required"}, status=status.HTTP_400_BAD_REQUEST)
      try:
         user_id = force_str(urlsafe_base64_decode(uid))
         user = User.objects.get(pk=user_id)
      except Exception:
         return Response({"error":"Invalid reset link"}, status=status.HTTP_400_BAD_REQUEST)
      
      token_generator=PasswordResetTokenGenerator()
      if not token_generator.check_token(user,token):
         return Response({"error":"Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
      
      user.set_password(password)
      user.save()

      return Response({"message":"Password updated sucessfully"}, status=status.HTTP_200_OK)
   

def send_reset_password_email(to_email, reset_link):
  configuration = Configuration()
  configuration.api_key['api-key'] = settings.BREVO_API_KEY

  api_instance = TransactionalEmailsApi(ApiClient(configuration))
  
  email = SendSmtpEmail(
      sender={"name": "SnipBook", "email": "saramululo@gmail.com"},
      to=[{"email": to_email}],
      template_id=None,  
      subject="Reset your password",
      html_content=f"""
      <p>Hi,</p>
      <p>Click the link below to reset your password:</p>
      <p><a href="{reset_link}">Reset Password</a></p>
      <p>If you didn’t request this, ignore this email.</p>
      <p>Cheers,</p>
      <p>The Snipbook Team</p>
      """
  )
  
  api_instance.send_transac_email(email)