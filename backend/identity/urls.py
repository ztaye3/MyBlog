from django.urls import path
from django.conf.urls import include, url
from . import views


# Identity URLS
urlpatterns = [
    path('v1/user/', views.UserView.as_view({
        'get': 'list',
    })),
    path('v1/addUser/', views.UserView.as_view({
        'post': 'create'
    })),
    path('v1/user/<str:pk>/', views.UserView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    url(r'^v1/', include('djoser.urls')),
    url(r'^v1/', include('djoser.urls.jwt')),
    url(r'^v1/update-profile/', views.UpdateUserProfile.as_view()),

]
