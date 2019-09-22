from django.db import models
from datetime import datetime
#Création des BDD

#Fake BDD 
class Glace(models.Model):
    parfum_text = models.CharField(max_length=50)
    parfum_id = models.IntegerField(default=0)
    poids = models.FloatField(default=0)
    date_prod = models.DateField('date de production')
    no_lot = models.CharField(max_length=50)
    #Labo, Nice, Cannes, Antibes
    location = models.CharField(max_length = 100, default = "Labo")
    #Disponible ou Ordered ou Todo
    status = models.CharField(max_length = 20, default = "Disponible")
    #Labo, Nice, Cannes, Antibes
    franchise_name = models.CharField(max_length = 100, default = "None")
    commande_time = models.DateTimeField(default=datetime.now())
    def __str__(self):
        return self.parfum_text
    def __str__(self):
        return self.status
    def __str__(self):
        return self.franchise_name
    def __str__(self):
        return self.location

class Parfum(models.Model):
    parfum_text = models.CharField(max_length=50)
    def __str__(self):
        return self.parfum_text

class Franchise(models.Model):
    franchise_name = models.CharField(max_length = 100)
    def __str__(self):
        return self.franchise_name
