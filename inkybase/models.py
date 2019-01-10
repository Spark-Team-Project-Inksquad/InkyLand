from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Account(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    # may replace with specific field
    # with validation
    phone_number = models.CharField(blank=True, max_length = 11)
    bio = models.TextField()

    # is the account a vendor or not?
    isVendor = models.BooleanField(default = False)

    def __str__(self):
        return self.user.username + " Account"

# Favorite Vendors of a user
class FavoriteVendor(models.Model):
    owner = models.ForeignKey(Account, on_delete = models.CASCADE)
    vendor = models.ForeignKey(Account, on_delete = models.CASCADE, related_name = 'accounts_favorited')

# Review of a Vendor
class VendorReview(models.Model):
    author = models.ForeignKey(Account, on_delete = models.CASCADE, related_name = "vendor_reviews")
    reviewed_vendor = models.ForeignKey(Account, on_delete = models.CASCADE)

# Printer that a vendor could potential own
class Printer(models.Model):
    name = models.CharField(max_length = 200)
    manufacturer = models.CharField(max_length = 200)
    upc = models.CharField(max_length = 12)

# medium of printing (2D, 3D, etc)
class PrintingMedium(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField()

# Type of Document
class DocumentType(models.Model):
    name = models.CharField(max_length = 150)
    extension = models.CharField(max_length = 10)
    info = models.TextField()

# Document itself
class Document(models.Model):
    owner = models.ForeignKey(Account, on_delete = models.CASCADE)
    document_type = models.ForeignKey(DocumentType, on_delete = models.SET_NULL, null = True)
    uploaded_file = models.FileField(upload_to = 'uploads/')
    printing_medium = models.ForeignKey(PrintingMedium, on_delete = models.SET_NULL, null = True)

# Offer for printing documents with conditions
class PrintingOffer(models.Model):
    owner = models.ForeignKey(Account, on_delete = models.CASCADE)
    printerName = models.CharField(max_length = 100)
    printer = models.ForeignKey(Printer, on_delete = models.SET_NULL, related_name = "offers", null = True)
    minPrice = models.DecimalField(max_digits = 10, decimal_places = 2)
    maxPrice = models.DecimalField(max_digits = 10, decimal_places = 2)
    note = models.TextField()

class OfferSpec(models.Model):
    printing_offer = models.ForeignKey(PrintingOffer, on_delete = models.CASCADE)
    description = models.TextField()
    printing_mediums = models.ManyToManyField(PrintingMedium)
    document_types = models.ManyToManyField(DocumentType)

# Order that has been placed on a specific offer
class Order(models.Model):
    address = models.TextField()
    orderer = models.ForeignKey(Account, on_delete = models.CASCADE, related_name = "orders")
    documents = models.ManyToManyField(Document)
    lat = models.FloatField()
    lon = models.FloatField()
    pickup = models.BooleanField(default = False)
    shipping = models.BooleanField(default = False)
    printing_offer = models.ForeignKey(PrintingOffer, on_delete = models.CASCADE, related_name = "orders")
