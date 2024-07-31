from django.urls import path
from .views import UserInfoList

urlpatterns = [
    path('myProfile/getUserList/', UserInfoList.as_view(), name='user_list'),
    path('myProfile/setUserRole/', UserInfoList.as_view(), name='set_user_role'),
]