from django.db import models

# Create your models here.

class Autor(models.Model):
    imie = models.CharField(max_length=255)
    zdjecie = models.ImageField(null=True,blank=True,upload_to='author_images')

    def __str__(self):
        return self.imie

class Cytat(models.Model):
    autor = models.ForeignKey(Autor,on_delete=models.CASCADE)
    tresc = models.TextField()
    pozytywne = models.IntegerField(default=0)
    negatywne = models.IntegerField(default=0)

    def __str__(self):
        return self.tresc
