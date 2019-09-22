from django import forms
from .models import Glace
from datetime import datetime
from django.forms.widgets import SelectDateWidget, TextInput, NumberInput
from .models import Parfum, Franchise
from bootstrap_datepicker_plus import DatePickerInput

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset

#Formulaire d'ajout de bac
class AddForm(forms.Form):
   BDD_PARFUM = []
   parfum_text = forms.ModelChoiceField(label = 'Parfum', required=True, widget=forms.Select(choices=BDD_PARFUM), queryset=Parfum.objects.all())
   poids1 = forms.FloatField(label='Bac 1 (g)', initial=0)
   poids2 = forms.FloatField(label='Bac 2 (g)', initial=0)
   poids3 = forms.FloatField(label='Bac 3 (g)', initial=0)
   poids4 = forms.FloatField(label='Bac 4 (g)', initial=0)
   poids5 = forms.FloatField(label='Bac 5 (g)', initial=0)
   date_prod = forms.DateField(label='Date de Production', initial = datetime.now(), widget=SelectDateWidget(empty_label="Nothing"))


# Formulaire ajout stock
class ProdForm(forms.Form):
   BDD_PARFUM = []
   parfum_text = forms.ModelChoiceField(label="Parfum", required=True, queryset=Parfum.objects.all(),widget=forms.Select(attrs={'class':'form-control'}))
   no_lot = forms.CharField(label="N° de lot", initial = "", widget=TextInput(attrs={'size':10,'class':'form-control'}))
   poids = forms.IntegerField(label="Poids (g)", initial=1000, widget=NumberInput(attrs={'size':3,'class':'form-control span2'}))
   date_prod = forms.DateField(label='Date de production', initial = datetime.now(), widget=DatePickerInput(format='%d/%m/%Y',attrs={'class':'form-control'}))


#Formulaire de commande
#Cette structure permet de générer un nombre de field dépendant de l'attribut 'questions'
class OrderForm(forms.Form):
   def __init__(self, *args, **kwargs):
        questions = kwargs.pop('questions')
        super(OrderForm, self).__init__(*args, **kwargs)
        #On itère la BDD pour appeler les fields du nom des parfums (pas facile à comprendre)
        iter_BDD = iter(Parfum.objects.all())
        for q in questions:
            self.fields[str(next(iter_BDD))] = forms.IntegerField(label = q, initial = 0, min_value=0, widget=forms.TextInput(attrs={'class':'form-control span3'}))

class AuthForm(forms.Form):
   #franchise_name = forms.CharField(label='Client', initial = "")
   franchise_name = forms.ModelChoiceField(label="Franchise", required = True, queryset=Franchise.objects.all(), widget=forms.Select(attrs={'class':'form-control'}))

#    count = forms.ChoiceField(choices=[(x, x) for x in range(1, 32)])
#    l=(forms.ChoiceField(choices=[(x, x) for x in range(1, 32)]), forms.ChoiceField(choices=[(x, x) for x in range(1, 45)]))

# OrderFormSet = formset_factory(OrderForm, extra=3)

class AutoAddForm(forms.Form):
   parfum = forms.CharField(label="parfum", required=True)
   number = forms.FloatField(label='nombre', required=True)