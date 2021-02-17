from django.urls import path,include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'autor', views.AutorViewSet)
router.register(r'cytaty', views.CytatViewSet)
router.register('CytatyAutora', views.CytatyAutoraViewSet, basename='cytatyautora')

urlpatterns = [
    path('', include(router.urls)),
    # path('autor/<int:id>/cytaty' )
]