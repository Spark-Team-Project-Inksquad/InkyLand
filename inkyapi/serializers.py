from rest_framework import serializers

from inkybase.models import Account, FavoriteVendor, PrintingOffer, PrintingMedium, DocumentType, Printer, Order, Document, VendorReview, OfferSpec

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'user', 'phone_number', 'bio', 'isVendor')

class FavoriteVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteVendor
        fields = ('id', 'owner', 'vendor')


class PrintingOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingOffer
        fields = ('id', 'owner', 'printerName', 'printer', 'minPrice', 'maxPrice', 'note')


class PrintingMediumSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingMedium
        fields = ('id', 'name', 'description')


class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = ('id', 'name', 'extension', 'info', 'printing_medium')

class PrinterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Printer
        fields = ('id', 'name', 'description')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'address', 'orderer', 'documents', 'lat', 'lon', 'pickup', 'shipping', 'printing_offer')


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'owner', 'document_type', 'uploaded_file')


class VendorReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorReview
        fields = ('id', 'author', 'reviewed_vendor', 'score')

class OfferSpecSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferSpec
        fields = ('id', 'printing_offer', 'description', 'printing_mediums', 'document_types')
