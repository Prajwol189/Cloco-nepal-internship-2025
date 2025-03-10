from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Shipping
from ..serializers import ShippingSerializer

class ShippingListCreateAPIView(APIView):
    def get(self, request):
        shippings = Shipping.objects.all()
        serializer = ShippingSerializer(shippings, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ShippingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
