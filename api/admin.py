from django.contrib import admin
from .models import Autor,Cytat,Propozycje
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



@admin.register(Propozycje)
class PropozycjeAdmin(admin.ModelAdmin):
    list_display = ['id','autor','tresc']
    list_filter = ['autor']
    search_fields = ['tresc']

    actions = ['zatwierdz']

    def zatwierdz(self,request,queryset):
        for q in queryset:
            cytat = Cytat(tresc=q.tresc,autor=q.autor)
            cytat.save()
            q.delete()
    zatwierdz.short_description = "Dodaj do puli cytatów"




