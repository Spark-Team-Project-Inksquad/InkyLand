# Django
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

# Rest framework
from rest_framework import status, viewsets
from rest_framework import permissions
from rest_framework.decorators import action, permission_classes, authentication_classes
from rest_framework.response import Response

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Models + Serializers
from .serializers import ProfileSerializer,UserSerializer, AccountSerializer, FavoriteVendorSerializer, PrintingOfferSerializer, PrintingMediumSerializer, DocumentTypeSerializer, PrinterSerializer, OrderSerializer, DocumentSerializer, VendorReviewSerializer, OfferSpecSerializer
from inkybase.models import Account, FavoriteVendor, PrintingOffer, PrintingMedium, DocumentType, Printer, Order, Document, VendorReview, OfferSpec
from django.contrib.auth.models import User

# API Viewsets
# NOTE edit the descriptions

class AccountViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class ProfileViewSet(viewsets.ViewSet):

    """
    A viewset for Profile CRUD
    """

    def list(self, request):
        users = User.objects.all()
        accounts = Account.objects.all()

        serialized_profiles = []
        for account in accounts:
            serialized_profile = ProfileSerializer(account, many = False)
            #serialized_account = AccountSerializer(account, many = False)
            #associated_user = account.user
            #serialized_user = UserSerializer(associated_user, many = False)
            #serialized_profile = {**serialized_account.data, **serialized_user.data}
            serialized_profiles.append(serialized_profile.data)

        return Response(serialized_profiles)

    @action (detail = False, methods = ['get'], permission_classes = [IsAuthenticated])
    def logged_in_profile(self, request, pk=None):
        auth_user = request.user
        print (auth_user)

        #NOTE account should be tied to user
        auth_account = Account.objects.get(user = auth_user)

        if (auth_account):
            profile_serialized = ProfileSerializer(auth_account, many = False)
            return JsonResponse(profile_serialized.data)
        else:
            return JsonResponse({"error": "BAD"})

    # DNE
    # Account created on user creation
    # NOTE Handled by user registration
    def create(self, request):
        pass

    @permission_classes((IsAuthenticated, ))
    #NOTE can only update logged in profile
    def update(self, request, pk=None):
        auth_user = request.user
        requested_account = Account.objects.get(id=pk)

        print ("UPDATE")
        print (request.data)

        if (auth_user.id == requested_account.user.id):
            print (requested_account)
            print ("START")

            # Weird username conflict patch
            if (request.data['user']['username'] == auth_user.username):
                request.data['user'].pop('username', None)
                print ("conflict")

            profile_serializer = ProfileSerializer(requested_account, data = request.data, partial = True)

            if (profile_serializer.is_valid()):
                print ("valid!")
                profile_serializer.save()
                return JsonResponse(profile_serializer.data)
            else:
                return JsonResponse(profile_serializer.errors, status=400)
        else:
            # TODO replace with correct response
            return JsonResponse({"status": 200, "message": "Invalid Request"})

        return Response({"hmm": "I know"})

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass

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
