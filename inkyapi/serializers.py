from rest_framework import serializers

from inkybase.models import Account, FavoriteVendor, PrintingOffer, PrintingMedium, DocumentType, Printer, Order, Document, VendorReview, OfferSpec
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'user', 'phone_number', 'bio', 'isVendor')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Account
        fields = ('id', 'user', 'phone_number', 'bio', 'isVendor')

    # Updates the Profile
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')

        for (key, value) in user_data.items():
            if (key == "username" and instance.user.username == value):
                continue

            setattr(instance.user, key, value)

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        instance.user.save()
        instance.save()
        return instance

class FavoriteVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteVendor
        fields = ('id', 'owner', 'vendor')

class PrinterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Printer
        fields = ('id', 'name', 'manufacturer', 'upc')

class PrintingMediumSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingMedium
        fields = ('id', 'name', 'description')

class PrintingOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingOffer
        fields = ('id', 'owner', 'printerName', 'printer', 'minPrice', 'maxPrice', 'note')

class PrintingOfferDetailedSerializer(serializers.ModelSerializer):
    printer = PrinterSerializer()

    class Meta(PrintingOfferSerializer.Meta):
        pass

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['specs'] = OfferSpecDetailedSerializer(OfferSpec.objects.all().filter(printing_offer = instance.id),many = True).data
        return ret


class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = ('id', 'name', 'extension', 'info', 'printing_medium')



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

class OfferSpecDetailedSerializer(serializers.ModelSerializer):
    printing_mediums = PrintingMediumSerializer(many = True)
    document_types = DocumentTypeSerializer(many = True)


    class Meta(OfferSpecSerializer.Meta):
        pass
