from rest_framework import serializers
from todo.models import *
from django.contrib.auth import get_user_model

class TodoListSerializer(serializers.ModelSerializer): # forms.ModelForm
    class Meta:
        url = serializers.SerializerMethodField(read_only=True)
        model=TodoList

        fields = [
            'pk',
            'user',
            'username',
            'title',
            

        ]
        read_only_fields = ['pk','user','username']

class TodosSerializer(serializers.ModelSerializer): # forms.ModelForm
    class Meta:
        url = serializers.SerializerMethodField(read_only=True)
        model = Todos
        fields = [
            'pk',
            'list',
            'task',
            'timestamp',
            'expiration_date',
            'status',


        ]
        read_only_fields = ['pk','user']


class UserSerializer(serializers.ModelSerializer):

    password=serializers.CharField(write_only=True)
    def create(self, validated_data):
        user=get_user_model().objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    class Meta:
        model=get_user_model()
        fields=('username','password')