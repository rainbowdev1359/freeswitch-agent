from django.urls import path
from .views import ManageList

urlpatterns = [
    path('getRoleGrant/', ManageList.as_view(), name='manage_list'),
    path('updateRoleGrant/', ManageList.as_view(), name='update_list'),    
]