from django.urls import path
from .views import ListCreateAPIView, ListRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ListCreateAPIView.as_view(), name='list-create'),
    path('<int:pk>/', ListRetrieveUpdateDestroyAPIView.as_view(), name='list-detail-update-delete'),
]