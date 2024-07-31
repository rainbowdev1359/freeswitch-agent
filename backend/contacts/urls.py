from django.urls import path
from .views import ContactListCreateAPIView, ContactRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('<int:pk>/', ContactRetrieveUpdateDestroyAPIView.as_view(), name='contact-detail-update-delete'),
]