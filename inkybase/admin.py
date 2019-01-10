from django.contrib import admin


# import models
from .models import Account, FavoriteVendor, VendorReview, Printer, PrintingMedium, DocumentType, Document, PrintingOffer, OfferSpec, Order

# Register your models here.
admin.site.register(Account)
admin.site.register(FavoriteVendor)
admin.site.register(VendorReview)
admin.site.register(Printer)
admin.site.register(PrintingMedium)
admin.site.register(DocumentType)
admin.site.register(Document)
admin.site.register(PrintingOffer)
admin.site.register(OfferSpec)
admin.site.register(Order)
