from django.contrib import admin
from django.urls import path,include
from pprint import pprint

import rest_framework.routers
from rest_framework_nested import routers
from rest_framework.routers import DefaultRouter

from notesapp.views import *
from userApp.views import *

router =routers.DefaultRouter()
router.register('',NotesViewSet,basename='notes')
# api/notes/    2/comments/3
notesrouter= routers.NestedDefaultRouter(router,'',lookup='notes')
notesrouter.register('comment/',CommentsViewSet , basename='notes_comments')
# pprint(router.urls)


categoryRouter= DefaultRouter()
categoryRouter.register('',CategoryViewSet,basename='category')


urlpatterns = [
    path('category/',include(categoryRouter.urls)),
    path('user/<int:pk>/',UserNotes.as_view()),
    path('',include(router.urls)),
    path('',include(notesrouter.urls)),

]
