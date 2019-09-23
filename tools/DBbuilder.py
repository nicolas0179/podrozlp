import os
import pymongo
import ssl
from pprint import pprint
import csv
import requests 



KEY = 'AIzaSyAA5fe3jh1XfM5iBsd_ELWVkQXHwlr8xC4'
URL= "mongodb+srv://admin:admin@monpremiercluster-d66o9.gcp.mongodb.net/test?retryWrites=true&w=majority"
client = pymongo.MongoClient(URL, ssl_cert_reqs=ssl.CERT_NONE)
db = client['test']
##################### LISTE DES PAYS
# pays= []
# URL="mongodb+srv://admin:admin@monpremiercluster-d66o9.gcp.mongodb.net/test?retryWrites=true&w=majority&db?ssl=true"
# client = pymongo.MongoClient(URL, ssl_cert_reqs=ssl.CERT_NONE)
# db = client['test']
# newcollec = db['pays']
# with open('PaysList.csv', 'r') as csvFile:
#     reader = csv.reader(csvFile)
#     for row in reader:
#         entry = {"Pays": row[0], "Capital": row[1]}
#         pprint(entry)
#         _useless = newcollec.insert_one(entry)
# csvFile.close()




################ ATTAQUE GOOGLE API PLACES

COUNTRY = 'Thaïlande'
r = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?input='+COUNTRY+'%20A%20faire&language=FR&inputtype=textquery&fields=name,rating&type=point_of_interest&key=AIzaSyAA5fe3jh1XfM5iBsd_ELWVkQXHwlr8xC4')
result = r.json()
collec = db['pois']

for i in range(len(result['results'])):
    entry = {"name": result['results'][i]['name'], 
        "address": result['results'][i]['formatted_address'],
        "rating" : result['results'][i]['rating'],
        "type" : result['results'][i]['types'][0],
        "country" : COUNTRY
        }
    _useless = collec.insert_one(entry)
    print(entry)

# newentry = {}



