from rest_framework import viewsets
from .models import Autor,Cytat
from .serializers import AutorSerializer,CytatSerializer,PropozycjeSerializer
from rest_framework.response import Response
from rest_framework import status
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

    def list(self,request):
        queryset = Cytat.objects.all()
        serializer = CytatSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Cytat.objects.all()
        cytaty = queryset.filter(autor=pk)
        serializer = CytatSerializer(cytaty,many=True)
        return Response(serializer.data)

class PropozycjeViewSet(viewsets.ViewSet):
    def create(self,request):
        serializer = PropozycjeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return  Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



