from django.forms import ModelForm
from inkybase.models import Order

# partial form for order
class OrderForm(ModelForm):
    class Meta:
        model = Order
        fields = '__all__'
