from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer, BucketSerializer, UserSerializer, BucketUserSerializer, TodoViewSerializer, BucketViewSerializer
from .models import User, Bucket, Todo

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer


class BucketViewSet(viewsets.ModelViewSet):
    queryset = Bucket.objects.all().order_by('id')
    serializer_class = BucketSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('id')
    serializer_class = TodoSerializer


class TodoListViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('id')
    serializer_class = TodoViewSerializer

class BucketUserViewSet(viewsets.ModelViewSet):
    queryset = Bucket.objects.all().order_by('id')
    serializer_class = BucketUserSerializer

class BucketTodoViewSet(viewsets.ModelViewSet):
    queryset = Bucket.objects.all().order_by('id')
    serializer_class = BucketViewSerializer
