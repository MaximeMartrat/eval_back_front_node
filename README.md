# Evaluation NodeJs Back + Front
---
### Avertissement :
---
Une fois récupéré le dossier n'oubliez pas de faire la commande "npm init" dans le terminal
Puis "npm start" depuis le dossier back pour lancer le serveur

---
## Introduction
---
Une todolist faite avec beaucoup d'amour et de difficultés

---
## BackEnd
---

Fichier json pour les tableaux:
```
./src/model/todolist.json
```
L'index js
```
/app.js
```
L'ecoute des ports
```
/server.js
```
Les controllers
```
./src/controllers/todo_controller.js
./src/controllers/done_controller.js
```
Les routes
```
./src/routes/todo_route.js
./src/routes/done_route.js
```
---
### Liste des routes
---
| Routes | Verbe | Exemple | Explication |
| :------| :-----| :-------| -----------:|
| /todo | GET | http://localhost:3000/todo | une route qui va permettre d'afficher les données contenu dans le tableau d'un fichier |
| /todo/:id | GET | http://localhost:3000/todo/:id | une route qui va permettre d'afficher une entrée d'un tableau récupérée par son id  contenu dans un fichier |
| /todo | POST | http://localhost:3000/todo | une route qui va permettre d'insérer des données dans le tableau d'un fichier |
| /todo/:id | PUT | http://localhost:3000/todo/:id | une route qui va permettre de mettre à jour les données contenu dans le tableau d'un fichier en le ciblant par son id |
| /todo/:id| DELETE | http://localhost:3000/todo/:id | une route qui va permettre d'effacer les données contenu dans le tableau d'un fichier récupérer par son id |

---
### FRONTEND
---
fichier HTML pour l'index
```
/index.html
```
fichier CSS et JS séparé
```
/app.js
/style.css
```