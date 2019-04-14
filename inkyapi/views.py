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
from .serializers import ProfileSerializer, DetailedFavoriteVendorSerializer, OrderDetailedSerializer, PrintingOfferDetailedSerializer, UserSerializer, AccountSerializer, FavoriteVendorSerializer, PrintingOfferSerializer, PrintingMediumSerializer, DocumentTypeSerializer, PrinterSerializer, OrderSerializer, DocumentDetailedSerializer, DocumentSerializer, VendorReviewSerializer, OfferSpecSerializer
from inkybase.models import Account, FavoriteVendor, PrintingOffer, PrintingMedium, DocumentType, Printer, Order, Document, VendorReview, OfferSpec
from django.contrib.auth.models import User

# forms
from .forms import OrderForm

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

    # Lists all the profiles that are vendors
    @action (detail = False, methods = ['get'])
    def list_vendors(self, request, pk = None):
        vendors = Account.objects.all().filter(isVendor = True)

        serialized_profiles = []
        for vendor in vendors:
            serialized_profile = ProfileSerializer(vendor, many = False)
            serialized_profiles.append(serialized_profile.data)

        return Response(serialized_profiles)

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

    # POST favorites a vendor
    @action (detail = True, methods = ['post'], permission_classes = [IsAuthenticated])
    def favorite_vendor(self, request, pk=None):
        # get the auth user
        auth_user = request.user

        # retrieve the favorite vendor
        vendor = Account.objects.get(id=pk)

        # create the favorite vendor object
        favorite_vendor = FavoriteVendor(owner = auth_user.account, vendor = vendor)

        # Save the object to the database
        favorite_vendor.save()

        # serialize object
        serialized_favorite_vendor = DetailedFavoriteVendorSerializer(favorite_vendor, many = False)

        # return serialization
        return Response(serialized_favorite_vendor.data)

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

class FavoriteVendorViewSet(viewsets.ViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = FavoriteVendorSerializer
    queryset = FavoriteVendor.objects.all()

    # GET lists the favorite vendors
    @action (detail = False, methods = ['get'], permission_classes = [IsAuthenticated])
    def list_favorites(self, request):
        # get the authenticated user
        auth_user = request.user

        # retrieve and serialize the favorites list
        favorites_list = FavoriteVendor.objects.all().filter(owner = auth_user.account)
        serialized_favorites_list = DetailedFavoriteVendorSerializer(favorites_list, many = True)

        # Returns the json response for the favorites
        return Response(serialized_favorites_list.data)

    # unfavorites a vendor i.e DELETE
    @action (detail = True, methods = ['delete'], permission_classes = [IsAuthenticated])
    def unfavorite_vendor(self, request, pk=None):
        # get the authenticated user
        auth_user = request.user
        selected_favorite = FavoriteVendor.objects.get(owner = auth_user.account, pk = pk)


        # Checks if the user is logged in correctly
        # If not shoot an error
        if (str(auth_user) == "AnonymousUser"):
            return Response({'status': 'must be logged in!'})

        # Checks if the selected printing offer is part of the logged in users account
        if (selected_favorite.owner == auth_user.account):
            # If so, destroy the offer
            selected_favorite.delete()
            return Response({'status': 'deleted', 'message': 'favorite vendor Deleted'})

class PrintingOfferViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = PrintingOfferSerializer
    queryset = PrintingOffer.objects.all()

    # Places an order for a printing offer
    @action(detail = True, methods = ['post'], permission_classes = [IsAuthenticated])
    def place_order(self, request, pk = None):
        printing_offer = self.get_object()
        auth_user = request.user

        # Checks if the user is logged in correctly
        # If not shoot an error
        if (str(auth_user) == "AnonymousUser"):
            return Response({'status': 'must be logged in!'})

        orderer = auth_user.account
        new_order = Order(orderer = orderer)
        form = OrderForm(request.data, instance = new_order)

        if (form.is_valid()):
            form.save()
            print ("success")
            serializer = OrderSerializer(new_order, many = False)
            return Response(serializer.data)
        else:
            print ("ERRROR")
            print (form.errors)
            return Response({'status': 'unable to create order'})


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
    permission_classes = [IsAuthenticated]

    # Cancels a order if the user is the orderer or vendor
    @action(detail = True, methods = ['delete'], permission_classes = [IsAuthenticated])
    def cancel_order(self, request, pk = None):
        auth_user = request.user
        order = self.get_object()

        if (order.orderer == auth_user.account or order.printing_offer.owner == auth_user.account):
            order.delete()
            return Response({'message': 'ORDER_DELETED'})
        else:
            return Response({'message': 'Not authorized to cancel order'})

    # Overrides the order retrieval request
    def retrieve(self, request, pk=None):
        auth_user = request.user
        order = self.get_object()

        # if the person is the orderer or the owner of the printing offer, they got access
        if (order.orderer == auth_user.account or order.printing_offer.owner == auth_user.account):
            serialized_order = OrderSerializer(order, many = False)
            return Response(serialized_order.data)
        else:
            return Response({'message': 'Not authorized to retrieve the order'})

    # Overrides update order behavior
    # Updates the printing order
    def update(self, request, pk=None):
        order = self.get_object()
        auth_user = request.user

        if (order.orderer == auth_user.account or order.printing_offer.owner == auth_user.account):
            # Authenticated
            pass
        else:
            return Response({'status': 'not auth'})

        order_form =  OrderForm(request.data, instance = order)

        if (order_form.is_valid()):
            order_form.save()
            serializer = OrderSerializer(order, many = False)
            return Response(serializer.data)

    # Retrieves order documents
    @action(detail = True, methods = ['get'], permission_classes = [IsAuthenticated])
    def documents(self, request, pk = None):
        auth_user = request.user
        order = self.get_object()

        # check if authenticated to actually retrieve order documents
        if (order.orderer == auth_user.account or order.printing_offer.owner == auth_user.account):
            # retrieve documents
            documents = order.documents

            # serialize + return documents
            serialized_documents = DocumentDetailedSerializer(documents, many = True)
            return Response(serialized_documents.data)
        else:
            return Response({'message': 'Not auth to retrieve order docs'})

    # Returns the contact info of both parties for a authenticated order
    @action (detail = True, methods = ['get'], permission_classes = [IsAuthenticated])
    def retrieve_contact_info(self, request, pk = None):
        auth_user = request.user
        order = self.get_object()

        # Validate
        if (order.orderer == auth_user.account or order.printing_offer.owner == auth_user.account):
            orderer = order.orderer
            vendor = order.printing_offer.owner

            # Return contact info
            ordererSerializer = ProfileSerializer(orderer, many = False)
            vendorSerializer = ProfileSerializer(vendor, many = False)

            return Response({'orderer': ordererSerializer.data, 'vendor': vendorSerializer.data})
        else:
            # Error
            return Response({'message': 'Not authorized to retrieve order info'})

    # Retrieves a detailed view of an order that the user is tied to in some way (vendor/orderer)
    @action(detail = True, methods = ['get'], permission_classes = [IsAuthenticated])
    def detailed_order(self, request, pk = None):
        auth_user = request.user
        order = self.get_object()

        if (order.orderer == auth_user.account or order.printing_offer.owner == auth_user.account):
            serializer = OrderDetailedSerializer(order, many = False)
            return Response(serializer.data)
        else:
            return Response({'message': 'Not authorized to retrieve order'})

    # retrieves in progress orders for user
    @action(detail = False, methods = ['get'], permission_classes = [IsAuthenticated])
    def retrieve_in_progress_orders(self, request):
        auth_user = request.user
        orders = Order.objects.all().filter(orderer = auth_user.account)
        serializer = OrderDetailedSerializer(orders, many = True)
        return Response(serializer.data)

    # retrieves orders to be fulfilled
    @action(detail = False, methods = ['get'], permission_classes = [IsAuthenticated])
    def retrieve_pending_orders(self, request):
        auth_user = request.user
        orders = Order.objects.all().filter(printing_offer__owner = auth_user.account)
        serializer = OrderDetailedSerializer(orders, many = True)
        return Response(serializer.data)

class DocumentViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = DocumentSerializer
    queryset = Document.objects.all()

    # retrieves the list of documents for a specific user
    @action(detail = False, methods = ['get'], permission_classes = [IsAuthenticated])
    def view_documents_for_user(self, request):
        auth_user = request.user
        documents = Document.objects.all().filter(owner = auth_user.account)
        serializer = DocumentDetailedSerializer(documents, many = True)
        return Response(serializer.data)

class VendorReviewViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''


    serializer_class = VendorReviewSerializer
    queryset = VendorReview.objects.all()
