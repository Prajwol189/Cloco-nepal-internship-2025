from django.urls import path
from .views import (
    AuthorListCreateAPIView, AuthorDetailAPIView,
    BookListCreateAPIView, BookDetailAPIView,
    PublisherListCreateAPIView, PublisherDetailAPIView,
    CategoryListCreateAPIView, CategoryDetailAPIView,
    CustomerListCreateAPIView, CustomerDetailAPIView
)

urlpatterns = [
    path('authors/', AuthorListCreateAPIView.as_view(), name='author-list'),
    path('authors/<int:pk>/', AuthorDetailAPIView.as_view(), name='author-detail'),
    
    path('books/', BookListCreateAPIView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailAPIView.as_view(), name='book-detail'),
    
    path('publishers/', PublisherListCreateAPIView.as_view(), name='publisher-list'),
    path('publishers/<int:pk>/', PublisherDetailAPIView.as_view(), name='publisher-detail'),
    
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    
    path('customers/', CustomerListCreateAPIView.as_view(), name='customer-list'),
    path('customers/<int:pk>/', CustomerDetailAPIView.as_view(), name='customer-detail'),
]
