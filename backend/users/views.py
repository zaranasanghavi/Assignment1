from django.shortcuts import render

# Create your views here.# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile
from .crypto import encrypt_data
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .crypto import decrypt_data


class RegisterView(APIView):
    def post(self, request):
        user = User.objects.create_user(
            username=request.data["username"],
            password=request.data["password"]
        )
        UserProfile.objects.create(
            user=user,
            phone=request.data["phone"],
            aadhaar_encrypted=encrypt_data(request.data["aadhaar"])
        )
        return Response({"message": "User registered successfully"})

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)
        return Response({
            "username": request.user.username,
            "phone": profile.phone,
            "aadhaar": decrypt_data(profile.aadhaar_encrypted)
        })
