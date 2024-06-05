from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView,
    TokenRefreshView,)


admin.site.site_header= 'Notes app'
admin.site.index_title='Hello Admin'
admin.site.site_title="hi"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('__debug__/', include('debug_toolbar.urls')),
    path('api/auth/',include('userApp.urls')),
    path('api/notes/',include('notesapp.urls')),
    path('api-auth/',include('rest_framework.urls')),
]
