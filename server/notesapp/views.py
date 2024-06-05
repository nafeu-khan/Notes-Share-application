from django.shortcuts import render
from httpx import request
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveAPIView,ListAPIView
from .permissions import *
from .models import *
from .serializers import *

class UserNotes(ListAPIView):
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Notes.objects.filter(author=pk)
    serializer_class=NotesSerializer

class NotesViewSet(ModelViewSet):
    queryset= Notes.objects.select_related('author').filter(visibility='public').all()
    serializer_class= NotesSerializer
    permission_classes=[IsAuthenticatedOrReadOnly]
    # def get_queryset(self):
    #     return Notes.objects.filter(author=self.request.user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class CategoryViewSet(ModelViewSet):
    # queryset=Category.objects.all()
    def get_queryset(self):
        print(self.request.data)
        return Category.objects.filter(author=self.request.user)
    permission_classes=[IsAuthenticatedOrReadOnly]
    serializer_class=CategorySerializer
    def perform_create(self, serializer):
        print(self.request.user)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class CommentsViewSet(ModelViewSet):
    def get_queryset (self):
        print("in com")
        return Comments.objects.all()
    serializer_class =CommentsSerializer

