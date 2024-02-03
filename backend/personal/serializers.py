from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer
from .models import Cv, Project, About


# About serializer
class AboutSerializer(ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'


# Cv serializer
class CvSerializer(ModelSerializer):
    class Meta:
        model = Cv
        fields = '__all__'


# Project serializer
class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
