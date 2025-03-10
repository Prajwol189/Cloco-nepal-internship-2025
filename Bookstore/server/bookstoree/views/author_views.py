from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Author
from ..serializers import AuthorSerializer

class AuthorListCreateAPIView(APIView):
    def get(self, request):
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuthorDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Author.objects.get(pk=pk)
        except Author.DoesNotExist:
            return None

    def get(self, request, pk):
        author = self.get_object(pk)
        if author is None:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AuthorSerializer(author)
        return Response(serializer.data)

    def put(self, request, pk):
        author = self.get_object(pk)
        if author is None:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AuthorSerializer(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        author = self.get_object(pk)
        if author is None:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        author.delete()
        return Response({"message": "Author deleted"}, status=status.HTTP_204_NO_CONTENT)
