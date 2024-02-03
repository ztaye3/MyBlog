from django.shortcuts import render
from .serializers import CvSerializer, AboutSerializer, ProjectSerializer
from .models import Cv, Project, About
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings


# Cv  view
class CvView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Cv.objects.all()
    serializer_class = CvSerializer(many=True)

    # Create cv API : api/personal/v1/cv/addCv/, Method:POST
    def create(self, request):

        # filter data
        data = request.data

        serializer = CvSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get all cv API : api/personal/v1/cv, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any cv exist
        try:
            queryset = Cv.objects.filter()
        except Cv.DoesNotExist:
            return Response(data={'message': 'No cv registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = CvSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Get CV API : api/personal/v1/cv/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the cv is exist
        try:

            queryset = Cv.objects.filter(id=pk)

        except Cv.DoesNotExist:
            return Response(data={'message': 'Cv does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = CvSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update cv API : api/personal/v1/cv/'pk'/, Method:PUT
    def update(self, request, pk=None):

        # Check if the cv exists
        try:
            queryset = Cv.objects.get(id=pk)
        except Cv.DoesNotExist:
            return Response(data={'message': 'Cv does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = CvSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete Cv API : api/personal/v1/cv/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the category exists
        try:
            queryset = Cv.objects.get(id=pk)
        except Cv.DoesNotExist:
            return Response(data={'message': 'Cv does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# About
class AboutView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = About.objects.all()
    serializer_class = AboutSerializer(many=True)

    # Create about API : api/personal/v1/about/addAbout/, Method:POST
    def create(self, request):

        # filter data
        data = request.data

        serializer = AboutSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get all about API : api/personal/v1/about, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any about exist
        try:
            queryset = About.objects.filter()
        except About.DoesNotExist:
            return Response(data={'message': 'No cv registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = AboutSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Get About API : api/personal/v1/about/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the about is exist
        try:

            queryset = About.objects.filter(id=pk)

        except About.DoesNotExist:
            return Response(data={'message': 'About does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = AboutSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update about API : api/personal/v1/about/'pk'/, Method:PUT
    def update(self, request, pk=None):

        # Check if the about exists
        try:
            queryset = About.objects.get(id=pk)
        except About.DoesNotExist:
            return Response(data={'message': 'Cv does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = AboutSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete about API : api/personal/v1/about/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the category exists
        try:
            queryset = About.objects.get(id=pk)
        except About.DoesNotExist:
            return Response(data={'message': 'About does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# Project
class ProjectView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer(many=True)

    # Create about API : api/personal/v1/project/addProject/, Method:POST
    def create(self, request):

        # filter data
        data = request.data

        serializer = ProjectSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get all project API : api/personal/v1/project, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any about exist
        try:
            queryset = Project.objects.filter()
        except Project.DoesNotExist:
            return Response(data={'message': 'No project registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = ProjectSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Get About API : api/personal/v1/project/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the project is exist
        try:

            queryset = Project.objects.filter(id=pk)

        except Project.DoesNotExist:
            return Response(data={'message': 'Project does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = ProjectSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update about API : api/personal/v1/project/'pk'/, Method:PUT
    def update(self, request, pk=None):

        # Check if the about exists
        try:
            queryset = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response(data={'message': 'Project does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = ProjectSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete about API : api/personal/v1/project/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the category exists
        try:
            queryset = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response(data={'message': 'Project does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# Contact
class ContactView(viewsets.ViewSet):

    # Create about API : api/personal/v1/contact, Method:POST
    def create(self, request):
        # filter data
        data = request.data

        subject = data['subject'] + "\t" + data['name'] + "\t" + data["email"]
        message = data['message']
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['klar.news.pilot@gmail.com']

        send_mail(subject, message, email_from, recipient_list)

        return Response(status=status.HTTP_201_CREATED)
