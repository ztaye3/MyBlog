from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
import json
from django.core.paginator import Paginator
from rest_framework.generics import ListAPIView
from .models import UserAccount
from .serializers import UserAdminSerializer, UpdateUserProfileSerializer


# User view
class UserView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = UserAccount.objects.all()
    serializer_class = UserAdminSerializer

    # Get all user API : api/auth/user/v1/, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any user exist
        try:
            queryset = UserAccount.objects.all()
        except UserAccount.DoesNotExist:
            return Response(data={'message': 'No user registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = UserAdminSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create user API : user/api/auth/v1/user/, Method:POST
    def create(self, request):

        serializer = UserAdminSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get user API : api/auth/user/v1/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the user is exist

        try:

            queryset = UserAccount.objects.get(id=pk)

        except UserAccount.DoesNotExist:
            return Response(data={'message': 'User does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = UserAdminSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update user API : api/auth/user/v1/'pk'/, Method:PUT
    def update(self, request, pk=None):

        # Check if the user exists
        try:
            if str(pk).isnumeric():
                queryset = UserAccount.objects.get(id=pk)
            else:
                queryset = UserAccount.objects.get(email=pk)

        except UserAccount.DoesNotExist:
            return Response(data={'message': 'User does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = UserAdminSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete user API : api/auth/user/v1/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the user exists
        try:
            queryset = UserAccount.objects.get(id=pk)
        except UserAccount.DoesNotExist:
            return Response(data={'message': 'UserAccount does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# Update profile
class UpdateUserProfile(ListAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UpdateUserProfileSerializer

    # Update user API : api/auth/v1/update-profile/, Method:POST
    def post(self, request, *args, **kwargs):
        email = request.data['email']
        data = request.data

        user = UserAccount.objects.get(email=email)
        serializer = UpdateUserProfileSerializer(instance=user, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
