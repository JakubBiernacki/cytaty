from rest_framework import serializers
from .models import Autor,Cytat,Propozycje

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = '__all__'

class CytatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cytat
        fields = '__all__'

class PropozycjeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propozycje
        fields = '__all__'