from django.urls import path
from .views import create_agent, get_agents, get_agent_by_id, delete_agent_by_id, update_agent_by_id
from django.conf import settings
from django.conf.urls.static import static
from .views import ObjectivesList, ProductsList, AgentDetail, ObjectivesDelete, ProductsDelete

urlpatterns = [
    path('', get_agents, name='agent-list'),
    path('create/', create_agent, name='agent-create'),
    path('<int:pk>/', get_agent_by_id, name='agent-detail'),
    path('<int:pk>/delete/', delete_agent_by_id, name='agent-delete'),
    path('update/', update_agent_by_id, name='agent-update'),  # New URL for updating an agent
    path('update_objectives/', ObjectivesList.as_view(), name='update_objectives'),
    path('update_products/', ProductsList.as_view(), name='update_products'),
    path('get_agent/', AgentDetail.as_view(), name='get_agent'),
    path('delete_objectives/', ObjectivesDelete.as_view(), name='delete_objectives'),
    path('delete_products/', ProductsDelete.as_view(), name='delete_products'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)