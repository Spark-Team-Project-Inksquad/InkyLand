# Django
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,JsonResponse

# Rest framework
from rest_framework import status, viewsets
from rest_framework import permissions
from rest_framework.decorators import action, permission_classes, authentication_classes
from rest_framework.response import Response

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Models + Serializers
from .serializers import ProfileSerializer, VendorSpecSerializer, DetailedFavoriteVendorSerializer, OrderDetailedSerializer, UserSerializer, AccountSerializer, FavoriteVendorSerializer, OrderSerializer, DocumentDetailedSerializer, DocumentSerializer, VendorReviewSerializer
from inkybase.models import Account, FavoriteVendor, Order, Document,VendorReview, VendorSpec
from django.contrib.auth.models import User

# forms
from .forms import OrderForm

# API Viewsets
# NOTE edit the descriptions

class UserViewSet(viewsets.ViewSet):
    """
    Viewset for extended User CRUD
    """
    # Does not do anything
    def list(self, request):
        return Response({'status': 'N/A'})

    # retrieves a specific user
    @permission_classes((IsAuthenticated, ))
    def retrieve(self, request, pk=None):

        auth_user = request.user

        queryset = User.objects.all()

        user = get_object_or_404(queryset, pk=pk)

        if (user.id != auth_user.id):
            return Response({'message': 'Cannot retrieve user! You do not have permission'}, status = status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)

        return Response(serializer.data)

    # updates a specific authenticated user
    @permission_classes((IsAuthenticated, ))
    def update(self, request, pk=None):
        auth_user = request.user
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)

        if (user.id != auth_user.id):
            return Response({'message': 'Cannot retrieve user! You do not have permission'}, status = status.HTTP_401_UNAUTHORIZED)

        user_serializer = UserSerializer(user, data = request.data, partial = True)

        if (user_serializer.is_valid()):
            print ("valid!")
            user_serializer.save()
            return JsonResponse(user_serializer.data)
        else:
            print (user_serializer.errors)
            return JsonResponse(user_serializer.errors, status=400)

class AccountViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing account instances
    '''

    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    # updates the account
    @permission_classes((IsAuthenticated, ))
    def update(self, request, pk=None):
        auth_user = request.user
        queryset = Account.objects.all()
        account = get_object_or_404(queryset, pk=pk)

        if (account.user.id != auth_user.id):
            return Response({'message': 'Cannot retrieve account! You do not have permission'}, status = status.HTTP_401_UNAUTHORIZED)

        if not ('user' in request.data):
            request.data['user'] = account.user.id

        account_serializer = AccountSerializer(account, data = request.data, partial = True)

        if (account_serializer.is_valid()):
            print ("valid!")
            account_serializer.save()
            return JsonResponse(account_serializer.data)
        else:
            print (account_serializer.errors)
            return JsonResponse(account_serializer.errors, status=400)




class ProfileViewSet(viewsets.ViewSet):

    """
    A viewset for Profile CRUD
    """

    # Lists all the profiles that are vendors
    @action (detail = False, methods = ['get'])
    def list_vendors(self, request, pk = None):
        vendors = Account.objects.all().filter(isVendor = True)
        serialized_profiles = ProfileSerializer(vendors, many = True)

        return Response(serialized_profiles.data)


    def list(self, request):
        users = User.objects.all()
        accounts = Account.objects.all()

        serialized_profiles = ProfileSerializer(accounts, many = True)
        print ("List")
        return Response(serialized_profiles.data)

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
                print (profile_serializer.errors)
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

# NOTE rework
class OrderViewSet(viewsets.ModelViewSet):
    '''
    Viewsets for viewing and editing order instances
    '''

    serializer_class = OrderSerializer
    queryset = Order.objects.all()


# Rework
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


class VendorSpecViewset(viewsets.ModelViewSet):
    '''
    Viewset that handles CRUD for vendor specs
    '''

    serializer_class = VendorSpecSerializer
    queryset = VendorSpec.objects.all()

    # Creation of Vendor Spec for (AUTH) Vendor
    @permission_classes((IsAuthenticated, ))
    def create(self, request):
        vendorSpecSerialized = VendorSpecSerializer(data=request.data)

        if (vendorSpecSerialized.is_valid()):
            vendorSpecSerialized.save()
            return Response(vendorSpecSerialized.data, status = status.HTTP_201_CREATED)
        else:
            return Response(vendorSpecSerialized.errors, status = status.HTTP_400_BAD_REQUEST)

    # Deletion of Vendor Spec for (AUTH Vendor
    @permission_classes((IsAuthenticated, ))
    def destroy(self, request, pk=None):
        auth_user = request.user
        vendor_spec = self.get_object()

        # check permissions
        if (vendor_spec.owner.id != auth_user.account.id):
            return Response({'message': 'Not Authorized!'}, status = status.HTTP_401_UNAUTHORIZED)

        vendorSerialized = VendorSpecSerializer(vendor_spec)
        vendor_spec.delete()
        return Response({'message':'spec deleted'}, status = status.HTTP_200_OK)


    # Viewing Vendor Spec
    # Implemented as part of spec

    # Editting Vendor Spec (AUTH)
    def update(self, request, pk=None):
        auth_user = request.user
        vendor_spec = self.get_object()

        # check permissions
        if (vendor_spec.owner.id != auth_user.account.id):
            return Response({'message': 'Not Authorized!'}, status = status.HTTP_401_UNAUTHORIZED)

        vendorspec_serializer = VendorSpecSerializer(vendor_spec, data = request.data, partial = True)

        if (vendorspec_serializer.is_valid()):
            print ("valid!")
            vendorspec_serializer.save()
            return JsonResponse(vendorspec_serializer.data)
        else:
            print (vendorspec_serializer.errors)
            return JsonResponse(vendorspec_serializer.errors, status=400)

        pass
