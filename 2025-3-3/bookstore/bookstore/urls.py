from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('bookstoree.urls')),  # Includes the bookstore app's URLs
]
