# audiows/routing.py

from django.urls import path
from appjango import consumers

websocket_urlpatterns = [
    path('ws/audio/', consumers.AudioConsumer.as_asgi()),
]