from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.static import serve
from . import views as comment_views
from . import views

urlpatterns = [
    # Cv url
    path('v1/cv', views.CvView.as_view({
        'get': 'list',
    })),
    path('v1/cv/addCv', views.CvView.as_view({
        'post': 'create'
    })),
    path('v1/cv/<str:pk>', views.CvView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    # About
    path('v1/about', views.AboutView.as_view({
        'get': 'list',
    })),
    path('v1/about/addAbout', views.AboutView.as_view({
        'post': 'create'
    })),
    path('v1/about/<str:pk>', views.AboutView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    # Project
    path('v1/project', views.ProjectView.as_view({
        'get': 'list',
    })),
    path('v1/project/addProject', views.ProjectView.as_view({
        'post': 'create'
    })),
    path('v1/project/<str:pk>', views.ProjectView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('v1/contact', views.ContactView.as_view({
        'post': 'create'
    })),
    ]