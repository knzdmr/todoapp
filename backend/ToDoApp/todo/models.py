from django.db import models
from datetime import date
from django.contrib.auth.models import User
from rest_framework.reverse import reverse as api_reverse

class TodoList(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    username=models.TextField(default='',blank=True )
    title=models.TextField(max_length=100,null=False,blank=False)
    

    def __str__(self):
       return str(self.user) +'-' + self.title
    def get_api_url(self, request=None):
        return api_reverse("todo-api:list", kwargs={'pk': self.pk}, request=request)

class Todos(models.Model):
    list=models.ForeignKey(TodoList, on_delete=models.CASCADE ,related_name='todo_list')
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    task = models.TextField(max_length=300, null=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    expiration_date = models.DateField(default=date.today, null=False)
    status = models.BooleanField(default=True)
    

    def __str__(self):
        return str(self.list) + '-' + self.task + '-' + str(self.expiration_date)

    def get_api_url(self, request=None):
        return api_reverse("todo-api:todo", kwargs={'pk': self.pk}, request=request)