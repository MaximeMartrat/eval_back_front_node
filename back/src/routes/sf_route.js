//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module action_controller
const sfController = require("../controllers/sf_controller");


//export du module router
module.exports = router;