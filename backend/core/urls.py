from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RefreshTokenView, UsernameAPIView, RemoveUserAPIView, UpdateUserAPIView
from .authentication import RegisterAPIView, ResetPasswordAPIView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/username/', UsernameAPIView.as_view(), name='api-username'),
    # path('api/contacts/search', ContactsSearchView.as_view(), name='contacts-search'),
    path('resetpassword/', ResetPasswordAPIView.as_view(), name='password_reset'),
    path('remove_user/', RemoveUserAPIView.as_view(), name='remove_user'),
    path('update_user/', UpdateUserAPIView.as_view(), name='update_user'),
]