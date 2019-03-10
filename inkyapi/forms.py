from django.forms import ModelForm
from inkybase.models import Order

# partial form for order
class PartialOrderForm(ModelForm):
    class Meta:
        model = Order
        exclude = ['orderer']
