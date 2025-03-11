from rest_framework import serializers
from .models import Author, Publisher, Category, Book, Customer, Order, OrderItem, Review, Payment, Shipping

class AuthorSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    bio = serializers.CharField()

class PublisherSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=200)
    website = serializers.URLField()

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)

class BookSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all())
    publisher = serializers.PrimaryKeyRelatedField(queryset=Publisher.objects.all())
    categories = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publisher', 'categories', 'price', 'stock']

class CustomerSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

class OrderSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    order_date = serializers.DateTimeField()

class OrderItemSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    quantity = serializers.IntegerField()

class ReviewSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    rating = serializers.IntegerField()
    comment = serializers.CharField()

class PaymentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    amount = serializers.DecimalField(max_digits=8, decimal_places=2)
    payment_date = serializers.DateTimeField()

class ShippingSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    address = serializers.CharField(max_length=255)
    shipped_date = serializers.DateTimeField()
