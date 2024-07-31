from django.urls import path
from .views import CampaignListCreateAPIView, CampaignRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('campaigns/', CampaignListCreateAPIView.as_view(), name='campaign-list-create'),
    path('campaigns/<int:pk>/', CampaignRetrieveUpdateDestroyAPIView.as_view(), name='campaign-detail-update-delete'),
]