# calls/urls.py
from django.urls import path
from .views import make_call, callback, MakeCallView, log

urlpatterns = [
    path('make/', make_call, name='make-call'),
    path('callback/', callback, name='callback'),
    path('log/', log, name='log'),
    # path('makecall/', MakeCallView.as_view(), name='make-call-view'),
    # Add other paths here
]