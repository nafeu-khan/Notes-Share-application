from rest_framework.generics import CreateAPIView,ListCreateAPIView,ListAPIView,RetrieveAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny,IsAuthenticated
import rest_framework.viewsets
from userApp.serializers import *
from userApp.models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import authenticate,login,logout

from rest_framework_simplejwt.tokens import RefreshToken,AccessToken

class RegisterView(CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]
    def post(self, request, *args, **kwargs):
        print(request.data)
        return super().post(request, *args, **kwargs)

class UserAPIView(ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=User.objects.all()
    serializer_class=UserSerializer
    # lookup_field='pk' #by default will search for pk
    # def post(self, request):
    #     username = request.data.get('username')
    #     password = request.data.get('password')
    #     user = authenticate(request, username=username, password=password)
    #     if user is not None:
    #         login(request, user)
    #         refresh = RefreshToken.for_user(user)
    #         print(refresh)
    #         return Response({'message': 'Login successful','refresh':str(refresh),'access':(refresh.access_token)}, status=status.HTTP_202_ACCEPTED)
    #     else:
    #         return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            logout(request)
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)