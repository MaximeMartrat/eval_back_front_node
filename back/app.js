//declaration des constantes
//pour l'export du module express
const express = require('express');
//pour l'export du modules fs
const fs = require('fs');
const app = express();
const myData = "./src/model/todolist.json"
//Constante pour l'export du module body-parser
const bodyParser = require("body-parser");
//Constante pour l'export du mod cors 
const cors = require("cors");
app.use(cors());
//import des routes de l'application
const todoRoute = require('./src/routes/todo_route.js')
const doneRoute = require('./src/routes/done_route.js')

//Route récupérée avec la methode GET permettant d'afficher les données contenus dans le fichier livres.json
app.get('/', (request, response) => {
    //Methode readFile du mod fs pour lire le fichier
    fs.readFile(myData, (err, data) => {
        //si erreur
        if(err) {
            //Erreur status 500 + message
            response.status(500).json({
                message: 'Erreur de lecture',
                error: err
            })
        //sinon
        } else {
            //Status 200  +  datas au format json
            response.status(200).json(JSON.parse(data))
        }
    })
})

//Pour faire l'appli express devra utiliser bodyParser
app.use(bodyParser.json());
//enregistrement des routes dans l'appli
app.use(todoRoute);
app.use(doneRoute);

//export du module app
module.exports = app;