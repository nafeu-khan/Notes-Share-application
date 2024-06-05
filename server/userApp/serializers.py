from rest_framework import serializers

from userApp.models import *

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields=['username','designation','role','password','address','email','first_name','last_name','phone']
        extra_kwargs={
            "password":{"write_only":True}
        }
    def validate(self, data):
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("user not found")
        return super().validate(data)
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data.get('role','student'),
            phone=validated_data['phone'],
            address=validated_data['address'],
            designation=validated_data['designation'],
        )
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','username','phone','email','address','designation','role']