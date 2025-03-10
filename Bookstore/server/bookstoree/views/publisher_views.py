from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Publisher
from ..serializers import PublisherSerializer

class PublisherListCreateAPIView(APIView):
    def get(self, request):
        publishers = Publisher.objects.all()
        serializer = PublisherSerializer(publishers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PublisherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublisherDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Publisher.objects.get(pk=pk)
        except Publisher.DoesNotExist:
            return None

    def get(self, request, pk):
        publisher = self.get_object(pk)
        if publisher is None:
            return Response({"error": "Publisher not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PublisherSerializer(publisher)
        return Response(serializer.data)

    def put(self, request, pk):
        publisher = self.get_object(pk)
        if publisher is None:
            return Response({"error": "Publisher not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PublisherSerializer(publisher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        publisher = self.get_object(pk)
        if publisher is None:
            return Response({"error": "Publisher not found"}, status=status.HTTP_404_NOT_FOUND)
        publisher.delete()
        return Response({"message": "Publisher deleted"}, status=status.HTTP_204_NO_CONTENT)
