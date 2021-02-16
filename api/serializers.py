from rest_framework import serializers
from .models import Autor,Cytat

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = '__all__'

class CytatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cytat
        fields = '__all__'