from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import FileResponse, HttpResponse   
from .models import Glace, Parfum, Franchise
from .forms import AddForm, OrderForm, AuthForm, ProdForm, AutoAddForm
from reportlab.pdfgen import canvas
from django.views.decorators.csrf import csrf_protect
from datetime import datetime
from django.forms import BaseFormSet
from django.forms import formset_factory

# Create your views here.

########################
##### SandBox View #####
########################
@csrf_protect
def index(request):
    #Instatiation des formulaires
    form = formset_factory(ProdForm, extra=1)
    formset = form()

    form2 = OrderForm(questions= Parfum.objects.all())
    form3 = AuthForm()
    form4 = ProdForm()
    autoAddForm = AutoAddForm()
    #Référence aux BDD
    parfum_BDD = Parfum.objects.all()
    glace_BDD = Glace.objects
    franchise_BDD = Franchise.objects.all()
    #Gestion du formulaire d'ajout de bac
    if request.method == 'POST' and 'b-send' in request.POST:
        print('OK')
        # form = AddForm(request.POST)
        # #Le formulaire est ok ?
        # if form.is_valid():
        #     #On récupère les data du form
        #     liste_poids = []
        #     liste_poids.append(form.cleaned_data['poids1'])
        #     liste_poids.append(form.cleaned_data['poids2'])
        #     liste_poids.append(form.cleaned_data['poids3'])
        #     liste_poids.append(form.cleaned_data['poids4'])
        #     liste_poids.append(form.cleaned_data['poids5'])
        #     while 0 in liste_poids:
        #         liste_poids.remove(0)

        #     parfum = form.cleaned_data['parfum_text']
            
        #     date_prod = form.cleaned_data['date_prod']
        #     #On récupère l'id en fonction du parfum choisi
        #     auto_id = Parfum.objects.filter(parfum_text=parfum).values('id')
        #     #On attaque la BDD
        #     for poids in liste_poids:
        #         if Glace.objects.filter(status = 'Todo', parfum_text = parfum).count()>0:
        #             todo_list = Glace.objects.filter(status = 'Todo', parfum_text = parfum).order_by('commande_time')
        #             id_to_delete = todo_list[0].id
        #             franchise_command = Glace.objects.filter(id=id_to_delete).values('franchise_name')
        #             new_entry = Glace(parfum_text=parfum, parfum_id=next(iter(auto_id))['id'], poids=poids/1000, date_prod=date_prod, status = 'Ordered', franchise_name = next(iter(franchise_command))['franchise_name'])
        #             Glace.objects.filter(id=id_to_delete).delete()
        #         elif Glace.objects.filter(status = 'Todo', parfum_text = parfum).count()== 0:
        #             new_entry = Glace(parfum_text=parfum, parfum_id=next(iter(auto_id))['id'], poids=poids/1000, date_prod=date_prod)
        #         new_entry.save()
        #     #On régénère le form (Peut-être pas nécessaire en fait)
        #     form = AddForm()
        # #On envoie vers la landing page

        # New version #
        form = formset_factory(ProdForm,formset=RequiredFormSet)
        formset = form(request.POST)
        #Le formulaire est ok ?
        print(formset.is_valid())
        print(formset.errors) #Ligne de Debug
        for f in formset:
            print(f.data)
            print(f.cleaned_data.get('poids'))

            if f.is_valid():
                poids = f.cleaned_data['poids']
                parfum = f.cleaned_data['parfum_text']
                print(parfum, 'passé')

                no_lot = f.cleaned_data['no_lot']
                date_prod = f.cleaned_data['date_prod']
                #On récupère l'id en fonction du parfum choisi
                auto_id = Parfum.objects.filter(parfum_text=parfum).values('id')
                
                #On attaque la BDD
                if Glace.objects.filter(status = 'Todo', parfum_text = parfum).count()>0:
                    todo_list = Glace.objects.filter(status = 'Todo', parfum_text = parfum).order_by('commande_time')
                    id_to_delete = todo_list[0].id
                    franchise_command = Glace.objects.filter(id=id_to_delete).values('franchise_name')
                    new_entry = Glace(parfum_text=parfum, parfum_id=next(iter(auto_id))['id'], poids=poids/1000, date_prod=date_prod, no_lot=no_lot, status = 'Ordered', franchise_name = next(iter(franchise_command))['franchise_name'])
                    Glace.objects.filter(id=id_to_delete).delete()
                elif Glace.objects.filter(status = 'Todo', parfum_text = parfum).count()== 0:
                    new_entry = Glace(parfum_text=parfum, parfum_id=next(iter(auto_id))['id'], poids=poids/1000, date_prod=date_prod, no_lot=no_lot)
                new_entry.save()
            #On régénère le form (Peut-être pas nécessaire en fait)
            form = formset_factory(ProdForm, extra=1)
            formset = form()
        #On envoie vers la landing page
        return redirect('land')

    if request.method == 'POST' and 'order' in request.POST:
        form2 = OrderForm(request.POST, questions=Parfum.objects.all())
        form3 = AuthForm(request.POST)
        #Vérification de la validité du Form
        if form2.is_valid() and form3.is_valid():
            print('Commande Validée')
            #On récupère les data du form
            data = form2.cleaned_data
            client = form3.cleaned_data['franchise_name']
            print(client)
            print('type : ', type(client))
            #Dict des données commandées (si nombre >0)
            ordered = {}
            for parfum, order in data.items():
                if order >0:
                    ordered[parfum] = order
            print('Commande : ', ordered)
            orderSystem(ordered, client)
            #On régénère le form (Peut-être pas nécessaire en faite)
            form2 = OrderForm(questions= Parfum.objects.all())
            form3 = AuthForm()
        #On envoie vers la landing page
        return redirect('land')
    #Context de notre view
    context = {
        'glace_BDD' : glace_BDD.order_by('-status','date_prod'),
        'parfum_BDD' : parfum_BDD,
        'franchise_BDD' : franchise_BDD,
        'form' : formset,
        'form2': form2,
        'form3': form3,
        'form4': form4,
        'autoAddForm' : AutoAddForm,
    }
    return render(request, 'AjaxTest/index.html', context)

def orderSystem(ordered, client):
    for p, n_order in ordered.items():
        dispo = Glace.objects.filter(parfum_text = p, status = "Disponible").count()
        if dispo >= n_order:
            # Ligne de dessous interdite solution possible : https://stackoverflow.com/questions/35206482/cannot-update-a-query-once-a-slice-has-been-taken-best-practices/35206976
            #Glace.objects.filter(parfum_text=p, status = 'Disponible').order_by('date_prod')[:n_order].update(status = 'Ordered', franchise_name = client)
            #Mise en place de la solution
            sliced_query = Glace.objects.filter(parfum_text=p, status = 'Disponible').order_by('date_prod')[:n_order]
            Glace.objects.filter(id__in=sliced_query).update(status = 'Ordered', franchise_name = str(client))
        # elif dispo == n_order:
        #     print("J'y suis")
        #     Glace.objects.filter(parfum_text=p, status = 'Disponible').update(status = 'Ordered', franchise_name = client)
        elif dispo == 0:
            for i in range(int(n_order)):
                auto_id = Parfum.objects.filter(parfum_text=p).values('id')
                todo = Glace(parfum_text = p, parfum_id = next(iter(auto_id))['id'] , poids= 0, location = 'Labo' ,date_prod = datetime.now(), status = 'Todo', franchise_name = str(client), commande_time = datetime.now())
                todo.save()
        else : 
            diff = int(n_order-dispo)
            Glace.objects.all().filter(parfum_text = p, status = 'Disponible').update(status='Ordered', franchise_name = str(client))
            for i in range(diff):
                auto_id = Parfum.objects.filter(parfum_text=p).values('id')
                todo = Glace(parfum_text = p, parfum_id = next(iter(auto_id))['id'] , poids= 0, location = 'Labo' ,date_prod = datetime.now(), status = 'Todo', franchise_name = str(client), commande_time = datetime.now())
                todo.save()



#############################
##### Génération du PDF #####
#############################
#A commenter une fois "amélioré"
def pdf(request):
    print('ok')
    logo = "http://papilla.fr/wp-content/uploads/2017/02/transpa-1024x474.png"
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=hello.pdf'
    p = canvas.Canvas(response)
    p.drawImage(logo, 0,100 , width=100,height=66.62,mask='auto')
    p.drawString(100, 100, "Hello world.")
    p.drawString(200,200, "Papilla")
    p.showPage()  
    p.save()
    return response

def test(request, parfum_text, number):
    #parfum_BDD = Parfum.objects.all()
    print('ok', parfum_text, number)
    for i in range(int(number)):
        poids = 0
        parfum = parfum_text
        no_lot = '0/0'
        date_prod = datetime.now()
        auto_id = Parfum.objects.filter(parfum_text=parfum).values('id')
        #On attaque la BDD
        #A REFAIRE PROPRE
        if Glace.objects.filter(status = 'Todo', parfum_text = parfum).count()>0:
            todo_list = Glace.objects.filter(status = 'Todo', parfum_text = parfum).order_by('commande_time')
            id_to_delete = todo_list[0].id
            franchise_command = Glace.objects.filter(id=id_to_delete).values('franchise_name')
            new_entry = Glace(parfum_text=parfum, parfum_id=next(iter(auto_id))['id'], poids=poids/1000, date_prod=date_prod, no_lot=no_lot, status = 'Ordered', franchise_name = next(iter(franchise_command))['franchise_name'])
            Glace.objects.filter(id=id_to_delete).delete()
        elif Glace.objects.filter(status = 'Todo', parfum_text = parfum).count()== 0:
            new_entry = Glace(parfum_text=parfum, parfum_id=next(iter(auto_id))['id'], poids=poids/1000, date_prod=date_prod, no_lot=no_lot)
        new_entry.save()
        
    context={
    }
    return redirect("/fabrication")

def delete_stock(request, bac):
    #todo_list = Glace.objects.filter(status = 'Todo', parfum_text = parfum).order_by('commande_time')
    id_to_delete = int(bac)
    Glace.objects.filter(id=id_to_delete).delete()
    return redirect("/#s2")
    #return redirect(request.META['HTTP_REFERER'])
    
###########################################
##### Landing Page apres une commande #####
###########################################

def land(request):
    context = {
    }
    return render(request, 'AjaxTest/land.html', context)

class RequiredFormSet(BaseFormSet):
    def __init__(self, *args, **kwargs):
        super(RequiredFormSet, self).__init__(*args, **kwargs)
        self.forms[0].empty_permitted = False

def accueil(request):
    today = datetime.now().strftime("%d-%m-%Y")
    parfum_BDD = Parfum.objects.all()
    glace_BDD = Glace.objects
    franchise_BDD = Franchise.objects.all()
    form2 = OrderForm(questions= Parfum.objects.all())
    form3 = AuthForm()
    if request.method == 'POST' and 'order' in request.POST:
        form2 = OrderForm(request.POST, questions=Parfum.objects.all())
        form3 = AuthForm(request.POST)
        #Vérification de la validité du Form
        if form2.is_valid() and form3.is_valid():
            print('Commande Validée')
            #On récupère les data du form
            data = form2.cleaned_data
            client = form3.cleaned_data['franchise_name']
            print(client)
            print('type : ', type(client))
            #Dict des données commandées (si nombre >0)
            ordered = {}
            for parfum, order in data.items():
                if order >0:
                    ordered[parfum] = order
            print('Commande : ', ordered)
            orderSystem(ordered, client)
            #On régénère le form (Peut-être pas nécessaire en faite)
            form2 = OrderForm(questions= Parfum.objects.all())
            form3 = AuthForm()
        #On envoie vers la landing page
        return redirect('/accueil')
    context = {
        'today' : today,
        'glace_BDD' : glace_BDD.order_by('-status','date_prod'),
        'parfum_BDD' : parfum_BDD,
        'franchise_BDD' : franchise_BDD,
        'form2' : form2,
        'form3' : form3
    }
    return render(request, 'AjaxTest/accueil.html', context)

def stocks(request):
    form = formset_factory(ProdForm, extra=1)
    formset = form()
    parfum_BDD = Parfum.objects.all()
    glace_BDD = Glace.objects
    franchise_BDD = Franchise.objects.all()
    form4 = ProdForm()
    autoAddForm = AutoAddForm()
    if request.method == 'POST' and 'b-send' in request.POST:
        print('OK')

        # New version #
        form = formset_factory(ProdForm,formset=RequiredFormSet)
        formset = form(request.POST)
        #Le formulaire est ok ?
        print(formset.is_valid())
        print(formset.errors) #Ligne de Debug
        for f in formset:
            print(f.data)
            print(f.cleaned_data.get('poids'))

            if f.is_valid():
                poids = f.cleaned_data['poids']
                parfum = f.cleaned_data['parfum_text']
                print(parfum, 'passé')

                no_lot = f.cleaned_data['no_lot']
                date_prod = f.cleaned_data['date_prod']
                #On récupère l'id en fonction du parfum choisi
                auto_id = Parfum.objects.filter(parfum_text=parfum).values('id')
                
                #On attaque la BDD
                if Glace.objects.filter(status = 'Todo', parfum_text = parfum).count()>0:
                    todo_list = Glace.objects.filter(status = 'Todo', parfum_text = parfum).order_by('commande_time')
                    id_to_delete = todo_list[0].id
                    franchise_command = Glace.objects.filter(id=id_to_delete).values('franchise_name')
                    new_entry = Glace(parfum_text=parfum, parfum_id=next(iter(auto_id))['id'], poids=poids/1000, date_prod=date_prod, no_lot=no_lot, status = 'Ordered', franchise_name = next(iter(franchise_command))['franchise_name'])
                    Glace.objects.filter(id=id_to_delete).delete()
                elif Glace.objects.filter(status = 'Todo', parfum_text = parfum).count()== 0:
                    new_entry = Glace(parfum_text=parfum, parfum_id=next(iter(auto_id))['id'], poids=poids/1000, date_prod=date_prod, no_lot=no_lot)
                new_entry.save()
            #On régénère le form (Peut-être pas nécessaire en fait)
            form = formset_factory(ProdForm, extra=1)
            formset = form()
        #On envoie vers la landing page
        return redirect('land')
    context = {
        'glace_BDD' : glace_BDD.order_by('parfum_text','poids','date_prod'),
        'parfum_BDD' : parfum_BDD,
        'franchise_BDD' : franchise_BDD,
        'form' : formset,
        'form4':form4,
        'autoAddForm' : AutoAddForm,
    }
    return render(request, 'AjaxTest/stocks.html', context)

def commandes(request):
    parfum_BDD = Parfum.objects.all()
    glace_BDD = Glace.objects
    franchise_BDD = Franchise.objects.all()
    context = {
        'glace_BDD' : glace_BDD.order_by('parfum_text','poids','date_prod'),
        'parfum_BDD' : parfum_BDD,
        'franchise_BDD' : franchise_BDD,
    }
    return render(request, 'AjaxTest/commandes.html', context)

def fabrication(request):
    parfum_BDD = Parfum.objects.all()
    glace_BDD = Glace.objects
    franchise_BDD = Franchise.objects.all()
    context = {
        'glace_BDD' : glace_BDD.order_by('-status','date_prod'),
        'parfum_BDD' : parfum_BDD,
        'franchise_BDD' : franchise_BDD,
    }
    return render(request, 'AjaxTest/fabrication.html', context)