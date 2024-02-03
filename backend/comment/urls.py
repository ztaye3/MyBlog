from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.static import serve
from . import views as comment_views
from . import views

urlpatterns = [
    path('/v1/', views.CommentView.as_view({
        'get': 'list',
    })),
    path('v1/addComment/', views.CommentView.as_view({
        'post': 'create'
    })),
    path('v1/<str:pk>/', views.CommentView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    ]