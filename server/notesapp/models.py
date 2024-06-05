from django.db import models

from userApp.models import User


class Notes(models.Model):
    VISIBILITY_CHOICES = (
        ('public', 'PUBLIC'),
        ('private', 'PRIVATE'),
    )
    title= models.CharField(max_length=100)
    category= models.ForeignKey('Category',on_delete=models.CASCADE)
    description= models.TextField()
    visibility=models.CharField(choices=VISIBILITY_CHOICES,max_length=10,default='public')
    author=models.ForeignKey(User,on_delete=models.CASCADE)

class Comments(models.Model):
    author= models.ForeignKey(User,on_delete=models.CASCADE)
    notes= models.ForeignKey(Notes,on_delete=models.CASCADE)
    description=models.TextField()
    created_on=models.DateTimeField(auto_now_add=True)
    last_update= models.DateTimeField(auto_now=True)

class Category(models.Model):
    title = models.CharField(max_length=200)
    description=models.TextField()
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    def __str__(self):
        return self.title