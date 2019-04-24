from django.contrib import admin


# import models
from .models import Account, FavoriteVendor, VendorReview, Document,  Order, VendorSpec, Chat, ChatMessage

# Register your models here.
admin.site.register(Account)
admin.site.register(FavoriteVendor)
admin.site.register(VendorReview)
admin.site.register(Document)
admin.site.register(Order)
admin.site.register(VendorSpec)
admin.site.register(Chat)
admin.site.register(ChatMessage)
