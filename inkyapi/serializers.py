from rest_framework import serializers

from inkybase.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'user', 'phone_number', 'bio', 'isVendor')

class FavoriteVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()


class PrintingOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()


class PrintingMediumSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()


class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()

class PrinterSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()


class VendorReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()

class OfferSpecSerializer(serializers.ModelSerializer):
    class Meta:
        model = A_Model
        fields = ()
