from rest_framework import viewsets
from .models import Autor,Cytat
from .serializers import AutorSerializer,CytatSerializer
from rest_framework.response import Response
from django.shortcuts import render,get_object_or_404
#permission
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class AutorViewSet(viewsets.ModelViewSet):
    """
    API endpoint dla wszystkich autorów
    """
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer



class CytatViewSet(viewsets.ModelViewSet):
    """
    API endpoint dla wszystkich cytatów
    """
    queryset = Cytat.objects.all()
    serializer_class = CytatSerializer

class CytatyAutoraViewSet(viewsets.ViewSet):

    def retrieve(self, request, pk=None):
        queryset = Cytat.objects.all()
        cytaty = queryset.filter(autor=pk)
        serializer = CytatSerializer(cytaty,many=True)
        return Response(serializer.data)



