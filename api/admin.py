from django.contrib import admin
from .models import Autor,Cytat
from django.utils.html import format_html
# Register your models here.

# admin.site.register(Autor)

class CytatyInline(admin.StackedInline):
    model = Cytat

@admin.register(Autor)
class AutorAdmin(admin.ModelAdmin):
    list_display = ['id','imie','zdjecie']
    inlines = [CytatyInline]

@admin.register(Cytat)
class CytatAdmin(admin.ModelAdmin):
    list_display = ['id','autor','tresc','pozytywne','negatywne']
    list_filter = ['autor']
    search_fields = ['tresc']





