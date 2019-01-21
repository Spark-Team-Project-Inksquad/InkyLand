# Django
from django.shortcuts import render
from django.http import HttpResponse

# Rest framework
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response

# Models + Serializers
from .serializers import AccountSerializer, FavoriteVendorSerializer, PrintingOfferSerializer, PrintingMediumSerializer, DocumentTypeSerializer, PrinterSerializer, OrderSerializer, DocumentSerializer, VendorReviewSerializer, OfferSpecSerializer
from inkybase.models import Account, FavoriteVendor, PrintingOffer, PrintingMedium, DocumentType, Printer, Order, Document, VendorReview, OfferSpec

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


# API Viewsets
# NOTE edit the descriptions

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

    serializer_class = FavoriteVendorSerializer
    queryset = FavoriteVendor.objects.all()

class PrintingOfferViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = PrintingOfferSerializer
    queryset = PrintingOffer.objects.all()

class PrintingMediumViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = PrintingMediumSerializer
    queryset = PrintingMedium.objects.all()

class DocumentTypeViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = DocumentTypeSerializer
    queryset = DocumentType.objects.all()

class PrinterViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = PrinterSerializer
    queryset = Printer.objects.all()

class OrderViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = OrderSerializer
    queryset = Order.objects.all()

class DocumentViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = DocumentSerializer
    queryset = Document.objects.all()

class VendorReviewViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''


    serializer_class = VendorReviewSerializer
    queryset = VendorReview.objects.all()
class OfferSpecViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = OfferSpecSerializer
    queryset = OfferSpec.objects.all()
