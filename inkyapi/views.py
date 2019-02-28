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
from .serializers import ProfileSerializer, OrderDetailedSerializer, PrintingOfferDetailedSerializer, UserSerializer, AccountSerializer, FavoriteVendorSerializer, PrintingOfferSerializer, PrintingMediumSerializer, DocumentTypeSerializer, PrinterSerializer, OrderSerializer, DocumentSerializer, VendorReviewSerializer, OfferSpecSerializer
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

    @permission_classes((IsAuthenticated, ))
    def destroy(self, request, pk = None):
        printing_offer = self.get_object()
        auth_user = request.user

        # Checks if the user is logged in correctly
        # If not shoot an error
        if (str(auth_user) == "AnonymousUser"):
            return Response({'status': 'must be logged in!'})

        # Checks if the selected printing offer is part of the logged in users account
        if (printing_offer.owner == auth_user.account):
            # If so, destroy the offer
            printing_offer.delete()
            return Response({'status': 'deleted', 'message': 'Offer Deleted'})

        return Response({'status': 'Something went wrong'})

    # List of all printing offers, but more detailed
    # NOTE could potential optimize
    @action(detail = False, methods= ['get'])
    def detailed_list(self, request):
        serializer = PrintingOfferDetailedSerializer(self.queryset, many = True)
        return Response(serializer.data)

    # Single detailed printing offer
    # NOTE could potential optimize
    @action(detail = True, methods = ['get'])
    def detailed(self, request, pk = None):
        printing_offer = self.get_object()
        serializer = PrintingOfferDetailedSerializer(printing_offer, many = False)
        return Response(serializer.data)

    @action(detail = False, methods = ['get'], permission_classes = [IsAuthenticated])
    def get_auth_printing_offers(self, request):
        auth_user = request.user
        printing_offers = PrintingOffer.objects.all().filter(owner = auth_user.account)
        serializer = PrintingOfferSerializer(printing_offers, many = True)
        return Response(serializer.data)

    # NOTE could potential optimize
    @action(detail = False, methods = ['get'], permission_classes = [IsAuthenticated])
    def get_auth_detailed_printing_offers(self, request):
        auth_user = request.user
        printing_offers = PrintingOffer.objects.all().filter(owner = auth_user.account)
        serializer = PrintingOfferDetailedSerializer(printing_offers, many = True)
        return Response(serializer.data)

    @action(detail = True, methods = ['get'])
    def offer_specs(self, request, pk = None):
        offer_specs = OfferSpec.objects.all().filter(printing_offer = pk)
        serializer = OfferSpecSerializer(offer_specs, many = True)
        return Response(serializer.data)

class OfferSpecViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = OfferSpecSerializer
    queryset = OfferSpec.objects.all()

    @permission_classes((IsAuthenticated, ))
    def destroy(self, request, pk = None):
        offer_spec = self.get_object()
        printing_offer = PrintingOffer.objects.get(pk = offer_spec.printing_offer.id)
        auth_user = request.user

        # Checks if the user is logged in correctly
        # If not shoot an error
        if (str(auth_user) == "AnonymousUser"):
            return Response({'status': 'must be logged in!'})

        # Checks if the selected printing offer is part of the logged in users account
        if (printing_offer.owner == auth_user.account):
            # If so, destroy the offer
            offer_spec.delete()
            return Response({'status': 'deleted', 'message': 'Offer Spec Deleted'})

        return Response({'status': 'Something went wrong'})


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
    Viewsets for viewing and editing order instances
    '''

    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    # returns list of orders for authenticated user
    #TODO split into one for pending orders and in progress orders
    @action(detail = False, methods = ['get'])
    def retrieve_orders(self, request):
        # LIMIT to auth user
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many = True)
        return Response(serializer.data)

    # returns a detailed version of a specific order
    # NOTE may require auth
    # NOTE should be limited to the owner + vendor
    @action(detail = True, methods = ['get'])
    def get_detailed_order_info(self, request, pk = None):
        order = self.get_object()
        serializer = OrderDetailedSerializer(order)
        return Response(serializer.data)

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