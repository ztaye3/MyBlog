from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.static import serve
from . import views

urlpatterns = [
    path('post/detail/v1/<slug>/', views.PostDetailView.as_view(), name='post-detail'),

    # post url
    path('post/v1/', views.PostView.as_view({
        'get': 'list',
    })),
    path('post/v1/addPost/', views.PostView.as_view({
        'post': 'create'
    })),
    path('post/v1/<str:pk>/', views.PostView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    # Get blog by category
    path('post/category/v1/<str:pk>/', views.PostByCategory.as_view({
        'get': 'retrieve',
    })),

    # category url
    path('category/v1/', views.CategoryView.as_view({
        'get': 'list',
    })),
    path('category/v1/addCategory/', views.CategoryView.as_view({
        'post': 'create'
    })),
    path('category/v1/<str:pk>/', views.CategoryView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    # Search blog
    path('post/search/v1/<str:pk>/', views.SearchPost.as_view({
        'get': 'retrieve',
    })),

    path('post/like/v1/<str:pk>/', views.UpdatePostLike.as_view({
        'put': 'update',
    })),
    ]