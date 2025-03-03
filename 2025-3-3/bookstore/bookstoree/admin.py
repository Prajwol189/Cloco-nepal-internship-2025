from django.contrib import admin
from .models import Author, Category, Publisher, Book, Customer, Order, OrderItem, Review, Payment, Shipping

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'publisher', 'price', 'stock')  # Removed category and published_date
    search_fields = ('title',)
    list_filter = ('author', 'publisher')  # Removed category

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email')  # Fixed name issue
    search_fields = ('first_name', 'last_name', 'email')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'order_date')  # Removed total_price
    list_filter = ('order_date',)
    search_fields = ('customer__first_name', 'customer__last_name')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'book', 'quantity')  # Removed price

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'book', 'customer', 'rating')
    list_filter = ('rating',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'amount', 'payment_date')  # Removed status
    list_filter = ('payment_date',)

@admin.register(Shipping)
class ShippingAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'address', 'shipped_date')
