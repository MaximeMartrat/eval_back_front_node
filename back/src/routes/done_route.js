//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module action_controller
const doneController = require("../controllers/done_controller");

//route pour afficher les données du tableau done
//GET "/done"
//ex: http://localhost:3000/done
router.get("/done", doneController.getDataTab);

//route pour afficher une donnée de done par son id
//GET "/done/:id"
//ex: http://localhost:3000/done/1
router.get("/done/:id", doneController.getDataById);

//route pour afficher les données de done par un titre
//GET "/done/titre/:titre"
//ex: http://localhost:3000/done/titre/:titre
router.get("/done/titre/:titre", doneController.getDataByTitle);

//route pour ajouter de la donnée dans le tableau done
//POST "/done"
//ex: http://localhost:3000/done
router.post("/done", doneController.createData);

//route pour mettre a jour les données d'un id de done
//PUT "/done/:id"
//ex : http://localhost:3000/done/1
router.put("/done/:id", doneController.updateData);

//route pour supprimer les données d'un id de done
//DELETE "/done/:id
//ex : http://localhost:3000/done/1
router.delete("/done/:id", doneController.deleteDataById);

//export du module router
module.exports = router;