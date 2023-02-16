//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module action_controller
const todoController = require("../controllers/todo_controller");

//route pour afficher les données du tableau todo
//GET "/todo"
//ex : http://localhost:3000/todo
router.get("/todo", todoController.getDataTab);

//route pour recupérer les données d'un id du tableau
//GET "/todo/:id"
//ex : http://localhost:3000/todo/1
router.get("/todo/:id", todoController.getDataById);

//route pour récupérer les données d'un titre du tableau
// GET "/todo/titre/:titre"
//ex : http://localhost:3000/todo/titre/:titre
router.get("/todo/titre/:titre", todoController.getDataByTitle);

//route pour ajouter des données au tableau todo
// POST "/todo"
//ex : http://localhost:3000/todo
router.post("/todo", todoController.createData);

//route pour mettre à jour les données d'un id du tableau
// PUT "/todo/:id"
//ex: http://localhost:3000/todo/1
router.put("/todo/:id", todoController.updateData);

//route pour supprimer un id du tableau todo et renvoyer les données supprimées dans le tableau done  
// DELETE "/todo/:id"
//ex: http://localhost:3000/todo/1
router.delete("/todo/:id", todoController.doneDataById);

//export du module router
module.exports = router;