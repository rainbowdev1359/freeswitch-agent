from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import CustomTokenObtainPairView

from calls.views import (
    MakeCallView,
    PhonenumberView,
    MakeCallSubMenuView,
    ScanCallView,
    ShowCallMenu,
    SendSMSView,
    SMSDLRView,
    IncomingSMSView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/agents/', include('agents.urls')),  # Ensure this line includes the agents app URLs
    path('api/calls/', include('calls.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('api/lists/', include('lists.urls')),
    path('api/campaigns/', include('campaigns.urls')),
    path('api/knowledge/', include('knowledge.urls')),
    path('api/', include('core.urls')),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/calls/phonenumber/', PhonenumberView.as_view()),
    path('api/calls/makecall/', MakeCallView.as_view()),
    path('api/calls/makecall_submenu/', MakeCallSubMenuView.as_view()),
    path('api/calls/scan/', ScanCallView.as_view()),
    path('api/calls/callmenu/', ShowCallMenu.as_view()),
    path('api/calls/sendsms/', SendSMSView.as_view()),
    path('api/calls/sms/callback/', SMSDLRView.as_view()),
    path('api/calls/sms/incoming/', IncomingSMSView.as_view()),
    path('api/', include('roles.urls')),
    path('api/', include('billing.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)