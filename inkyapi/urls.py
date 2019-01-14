from django.urls import path, include

from . import views

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import SimpleRouter, DefaultRouter

router = DefaultRouter()
router.register(r'accounts', views.AccountViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
