from django.urls import path, include

from . import views

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import SimpleRouter, DefaultRouter

router = DefaultRouter()
router.register(r'accounts', views.AccountViewSet)
router.register(r'users', views.UserViewSet, base_name = "User")
router.register(r'profiles', views.ProfileViewSet, base_name="Profile")
router.register(r'favorite-vendors', views.FavoriteVendorViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'document', views.DocumentViewSet)
router.register(r'vendor-reviews', views.VendorReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
