from .views import *
from django.urls import path,include,re_path
from django.conf.urls import url
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router=routers.SimpleRouter()
router.register(r'list',TodoListAPIView,'list')
router.register(r'todo',TodosAPIView,'todo')

urlpatterns = [
    url(r'^',include(router.urls)),
    url(r'^register/$', CreateUserView.as_view(),name='user'),
    url(r'^token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),


]
