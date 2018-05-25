# generic
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework.generics import CreateAPIView
from rest_framework import viewsets
from todo.models import *
from .serializers import *


class TodoListAPIView(viewsets.ModelViewSet):
    model= TodoList
    serializer_class = TodoListSerializer
    filter_backends = (SearchFilter,DjangoFilterBackend,OrderingFilter)
    ordering_fields=('pk',)
    def get_queryset(self):
        queryset=self.model.objects.all().filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user,username=self.request.user.get_username())

class TodosAPIView(viewsets.ModelViewSet):
    model= Todos
    serializer_class = TodosSerializer
    filter_backends = (SearchFilter,DjangoFilterBackend,OrderingFilter)
    filter_fields=('list','expiration_date','status')
    search_fields = ('task',)
    ordering=('expiration_date')

    def get_queryset(self):
        queryset=self.model.objects.all().filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class CreateUserView(CreateAPIView):
    model=get_user_model()
    permission_classes = [AllowAny,]
    serializer_class = UserSerializer