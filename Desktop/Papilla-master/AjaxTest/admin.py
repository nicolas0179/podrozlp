# Register your models here.
from django.contrib import admin

from .models import Glace, Parfum, Franchise

#Gestion des BDD Glace & Parfum dans le panel admin
class GlaceAdmin(admin.ModelAdmin):
    list_display = ('parfum_text', 'poids', 'date_prod', 'status', 'location', 'parfum_id', 'franchise_name', 'id')
    search_fields = ('status', 'parfum_text')
    list_per_page = 25

admin.site.register(Glace, GlaceAdmin)
admin.site.register(Parfum)
admin.site.register(Franchise)