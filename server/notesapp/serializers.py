from rest_framework import serializers
from notesapp.models import Category
from .models import *

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Notes
        fields=['id','title','category','description','author','visibility']
        extra_kwargs={
            'author':{
                'read_only':True
            }
        }
    author=serializers.StringRelatedField()
    # def create(self, validated_data):
    #     print(validated_data)
    #     cat = Notes.objects.create(**validated_data)
    #     cat.save()
    #     return cat
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['id','title','description','author']
        extra_kwargs={
            'author':{
                'read_only':True
            }
        }
    #no need this fuction it has by default
    # def create(self, validated_data):
    #     print(validated_data)
    #     cat = Category.objects.create(**validated_data)
    #     cat.save()
    #     return cat

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comments
        fields=['author','notes','description']