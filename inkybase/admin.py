from django.contrib import admin


# import models
from .models import Account, FavoriteVendor

# Register your models here.
admin.site.register(Account)
admin.site.register(FavoriteVendor)
