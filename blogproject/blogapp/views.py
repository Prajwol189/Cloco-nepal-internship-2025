from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from .models import Post
from .serializers import PostSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render

def home(request):
    return render(request, 'index.html')
# Custom JWT Login View
class LoginView(TokenObtainPairView):
    pass  # Uses default login from SimpleJWT

# List & Create Posts (Authenticated Users)
class PostListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
