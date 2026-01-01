

from django.urls import path
from .import views

urlpatterns = [
    path('register',views.RegisterViews),
    path('login',views.LoginViews),
    path('userDetails',views.UserDetails),

    ]
