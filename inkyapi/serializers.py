from rest_framework import serializers

from inkybase.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'user', 'phone_number', 'bio', 'isVendor')
