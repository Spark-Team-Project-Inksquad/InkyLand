# Django
from django.shortcuts import render
from django.http import HttpResponse

# Rest framework
from rest_framework import viewsets
from rest_framework.response import Response

# Models + Serializers
from .serializers import AccountSerializer
from inkybase.models import Account

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


# API Viewsets

class AccountViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class FavoriteVendorViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class PrintingOfferViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class PrintingMediumViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class DocumentTypeViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class PrinterViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class OrderViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class DocumentViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class VendorReviewViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''


    serializer_class = AccountSerializer
    queryset = Account.objects.all()
class OfferSpecViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()
