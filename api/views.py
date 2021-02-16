from rest_framework import viewsets
from .models import Autor,Cytat
from .serializers import AutorSerializer,CytatSerializer
from rest_framework.response import Response

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

    authentication_classes = [SessionAuthentication,BasicAuthentication]
    permission_classes = [IsAuthenticated]

class CytatViewSet(viewsets.ModelViewSet):
    """
    API endpoint dla wszystkich cytatów
    """
    queryset = Cytat.objects.all()
    serializer_class = CytatSerializer

    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]


