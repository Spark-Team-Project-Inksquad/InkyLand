from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Account(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, unique = True)
    # may replace with specific field
    # with validation
    phone_number = models.CharField(blank=True, max_length = 11)
    bio = models.TextField(blank = True)

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

    score = models.IntegerField(default = 0)

# Printer that a vendor could potential own
class Printer(models.Model):
    name = models.CharField(max_length = 200)
    manufacturer = models.CharField(max_length = 200)
    upc = models.CharField(max_length = 12)

# medium of printing (2D, 3D, etc)
class PrintingMedium(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField(blank = True)

    def __str__(self):
        return self.name

# Type of Document
class DocumentType(models.Model):
    name = models.CharField(max_length = 150)
    extension = models.CharField(max_length = 10)
    info = models.TextField(blank = True)
    printing_medium = models.ForeignKey(PrintingMedium, on_delete = models.SET_NULL, null = True)

    def __str__(self):
        return self.name

# Document itself
class Document(models.Model):
    owner = models.ForeignKey(Account, on_delete = models.CASCADE)
    document_type = models.ForeignKey(DocumentType, on_delete = models.SET_NULL, null = True)
    uploaded_file = models.FileField(upload_to = 'media/uploads/')

# Offer for printing documents with conditions
class PrintingOffer(models.Model):
    owner = models.ForeignKey(Account, on_delete = models.CASCADE)
    printerName = models.CharField(max_length = 100)
    printer = models.ForeignKey(Printer, on_delete = models.SET_NULL, related_name = "offers", null = True)
    minPrice = models.DecimalField(max_digits = 10, decimal_places = 2, null = True)
    maxPrice = models.DecimalField(max_digits = 10, decimal_places = 2, null = True)
    note = models.TextField(blank = True)

class OfferSpec(models.Model):
    printing_offer = models.ForeignKey(PrintingOffer, on_delete = models.CASCADE)
    description = models.TextField()
    printing_mediums = models.ManyToManyField(PrintingMedium, blank = True)
    document_types = models.ManyToManyField(DocumentType, blank = True)

# Order that has been placed on a specific offer
class Order(models.Model):
    address = models.TextField(blank = True)
    orderer = models.ForeignKey(Account, on_delete = models.CASCADE, related_name = "orders")
    documents = models.ManyToManyField(Document)
    lat = models.FloatField(null = True)
    lon = models.FloatField(null = True)
    pickup = models.BooleanField(default = False)
    shipping = models.BooleanField(default = False)
    printing_offer = models.ForeignKey(PrintingOffer, on_delete = models.CASCADE, related_name = "orders")
