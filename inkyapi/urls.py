from django.urls import path, include

from . import views

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import SimpleRouter, DefaultRouter

router = DefaultRouter()
router.register(r'accounts', views.AccountViewSet)
router.register(r'favorite-vendors', views.FavoriteVendorViewSet)
router.register(r'printing-offers', views.PrintingOfferViewSet)
router.register(r'printing-mediums', views.PrintingMediumViewSet)
router.register(r'document-types', views.DocumentTypeViewSet)

router.register(r'printers', views.PrinterViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'document', views.DocumentViewSet)
router.register(r'vendor-reviews', views.VendorReviewViewSet)
router.register(r'offer-specs', views.OfferSpecViewSet)



urlpatterns = [
    path('', include(router.urls)),
]
