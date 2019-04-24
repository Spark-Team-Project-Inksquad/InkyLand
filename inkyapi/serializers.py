from rest_framework import serializers
import os
from inkybase.models import Account, VendorSpec, Chat, ChatMessage, FavoriteVendor, Order, Document, VendorReview
from django.contrib.auth.models import User

from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('id', 'user', 'profile_img', 'address', 'phone_number', 'bio', 'isVendor')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Account
        fields = ('id', 'user', 'profile_img', 'address', 'phone_number', 'bio', 'isVendor')

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

class VendorReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorReview
        fields = ('id', 'author', 'reviewed_vendor', 'score')

class FavoriteVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteVendor
        fields = ('id', 'owner', 'vendor')

class DetailedFavoriteVendorSerializer(serializers.ModelSerializer):
    owner = ProfileSerializer()
    vendor = ProfileSerializer()

    class Meta(FavoriteVendorSerializer.Meta):
        pass


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = ('id', 'order', 'uploaded_file')


class DocumentDetailedSerializer(serializers.ModelSerializer):
    uploaded_file = serializers.SerializerMethodField()

    class Meta(DocumentSerializer.Meta):
        pass

    # Serializes the file
    def get_uploaded_file(self, obj):

        uploaded_file = {
            'url': obj.uploaded_file.url,
            'name': os.path.basename(obj.uploaded_file.name)
        }

        return uploaded_file

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'completed', 'progression', 'quantity', 'vendor_spec', 'vendor', 'customer')

class OrderDetailedSerializer(serializers.ModelSerializer):
    documents = DocumentSerializer(many = True)

    class Meta(OrderSerializer.Meta):
        pass

class VendorSpecSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorSpec
        fields = ('id', 'owner', 'type_of_print', 'material', 'transport', 'price_per', 'additional_info')

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'order', 'customer', 'vendor')

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ('id', 'from_account', 'to_account', 'message')
