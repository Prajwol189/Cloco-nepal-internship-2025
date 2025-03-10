from django.urls import path
from .views.author_views import AuthorListCreateAPIView, AuthorDetailAPIView
from .views.book_views import BookListCreateAPIView, BookDetailAPIView
from .views.publisher_views import PublisherListCreateAPIView, PublisherDetailAPIView
from .views.category_views import CategoryListCreateAPIView, CategoryDetailAPIView
from .views.customer_views import CustomerListCreateAPIView, CustomerDetailAPIView
from .views.order_views import OrderListCreateAPIView, OrderDetailAPIView
from .views.order_item_views import OrderItemListCreateAPIView
from .views.review_views import ReviewListCreateAPIView
from .views.payment_views import PaymentListCreateAPIView
from .views.shipping_views import ShippingListCreateAPIView

urlpatterns = [
    # Author URLs
    path('authors/', AuthorListCreateAPIView.as_view(), name='author-list'),
    path('authors/<int:pk>/', AuthorDetailAPIView.as_view(), name='author-detail'),
    
    # Book URLs
    path('books/', BookListCreateAPIView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailAPIView.as_view(), name='book-detail'),
    
    # Publisher URLs
    path('publishers/', PublisherListCreateAPIView.as_view(), name='publisher-list'),
    path('publishers/<int:pk>/', PublisherDetailAPIView.as_view(), name='publisher-detail'),
    
    # Category URLs
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    # Customer URLs
    path('customers/', CustomerListCreateAPIView.as_view(), name='customer-list'),
    path('customers/<int:pk>/', CustomerDetailAPIView.as_view(), name='customer-detail'),

    # Order URLs
    path('orders/', OrderListCreateAPIView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),

    # Order Item URLs
    path('order-items/', OrderItemListCreateAPIView.as_view(), name='orderitem-list'),

    # Review URLs
    path('reviews/', ReviewListCreateAPIView.as_view(), name='review-list'),

    # Payment URLs
    path('payments/', PaymentListCreateAPIView.as_view(), name='payment-list'),

    # Shipping URLs
    path('shippings/', ShippingListCreateAPIView.as_view(), name='shipping-list'),
]
