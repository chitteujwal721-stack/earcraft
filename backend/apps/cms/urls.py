from django.urls import path
from .views import CMSConfigView, MediaListView, MediaUploadView, MediaDeleteView

urlpatterns = [
    path('config/', CMSConfigView.as_view(), name='cms_config'),
    path('media/', MediaListView.as_view(), name='media_list'),
    path('media/upload/', MediaUploadView.as_view(), name='media_upload'),
    path('media/<str:pk>/', MediaDeleteView.as_view(), name='media_delete'),
]
