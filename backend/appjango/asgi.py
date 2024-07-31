import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
import appjango.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'appjango.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        appjango.routing.websocket_urlpatterns
    ),
})