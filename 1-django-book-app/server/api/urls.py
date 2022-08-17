from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView
)


urlpatterns = [
    path('books/', views.get_all_books),
    path('books/<int:pk>', views.get_book),
    path('authors/', views.get_all_authors),
    path('authors/<int:pk>', views.get_author),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]