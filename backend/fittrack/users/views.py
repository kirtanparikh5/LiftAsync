from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from .serializers import UserSerializer,RegisterSerializer
from rest_framework.parsers import MultiPartParser, FormParser

User = get_user_model()

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, UserSerializer


class RegisterView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # Save user
            user = serializer.save()

            # Generate JWT tokens for this user
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response(
                {
                    "message": "User registered successfully",
                    "user": UserSerializer(user).data,
                    "refresh": str(refresh),
                    "access": str(access),
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# class LogoutView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self,request):
#         try:
#             refresh_token = request.data.get('refresh')
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response(status=status.HTTP_205_RESET_CONTENT)
        
#         except:
#             return Response(status=status.HTTP_400_BAD_REQUEST)