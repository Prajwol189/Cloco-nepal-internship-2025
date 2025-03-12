from django.urls import path
from .views import PostListCreateView, LoginView, home
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
        path('', home, name='home'),
    path("api/posts/", PostListCreateView.as_view(), name="post-list-create"),
    path("api/token/", LoginView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
