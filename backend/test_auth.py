# test_auth.py

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

print("==== 1️⃣ Registration / Create user ====")
username = "newuser"
email = "newuser@example.com"
password = "userpassword"

# Check if user exists
if User.objects.filter(username=username).exists():
    user_obj = User.objects.get(username=username)
    print("User already exists:", user_obj.username)
elif User.objects.filter(email=email).exists():
    user_obj = User.objects.get(email=email)
    print("Email already in use:", user_obj.email)
else:
    user_obj = User.objects.create_user(username=username, email=email, password=password)
    print("User created:", user_obj.username, user_obj.email)

print("\n==== 2️⃣ Login with correct email + password ====")
try:
    user_obj = User.objects.get(email=email)
    print("Found user:", user_obj.username)
except User.DoesNotExist:
    print("No user found with this email")
    user_obj = None

if user_obj:
    logged_in_user = authenticate(username=user_obj.username, password=password)
    if logged_in_user:
        print("Login successful!")
        print("User ID:", logged_in_user.id)
        print("Username:", logged_in_user.username)
        print("Email:", logged_in_user.email)
    else:
        print("Incorrect password")

print("\n==== 3️⃣ Test wrong email ====")
try:
    user_obj = User.objects.get(email="wrong@example.com")
    print("Found user:", user_obj.username)
except User.DoesNotExist:
    print("No user found with this email (wrong email test)")

print("\n==== 4️⃣ Test wrong password ====")
try:
    user_obj = User.objects.get(email=email)
except User.DoesNotExist:
    user_obj = None

if user_obj:
    logged_in_user = authenticate(username=user_obj.username, password="wrongpassword")
    if logged_in_user:
        print("Login successful with wrong password? This should not happen!")
    else:
        print("Incorrect password (wrong password test)")
