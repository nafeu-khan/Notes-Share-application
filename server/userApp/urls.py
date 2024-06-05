from django.contrib import admin
from django.urls import include, path
from userApp.views import *
from rest_framework.routers import DefaultRouter

userRouter=DefaultRouter()
userRouter.register('',UserAPIView,basename='user')
urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('user/',include(userRouter.urls)),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]
