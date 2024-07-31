# knowledge/urls.py
from django.urls import path
from .views import create_knowledge, get_knowledges, get_knowledge_by_id, delete_knowledge_by_id, update_knowledge_by_id
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', get_knowledges, name='knowledge-list'),
    path('create/', create_knowledge, name='knowledge-create'),
    path('<int:pk>/', get_knowledge_by_id, name='knowledge-detail'),
    path('<int:pk>/delete/', delete_knowledge_by_id, name='knowledge-delete'),
    path('<int:pk>/update/', update_knowledge_by_id, name='knowledge-update'),  # New URL for updating an knowledge
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)