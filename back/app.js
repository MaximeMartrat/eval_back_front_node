//declaration des constantes
//pour l'export du module express
const express = require('express');
//pour l'export du modules fs
const fs = require('fs');
const app = express();
//Déclarer constante qui contiendra l'export du module body-parser
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
//Pour faire l'appli express devra utiliser bodyParser
app.use(bodyParser.json());


//export du module app
module.exports = app;