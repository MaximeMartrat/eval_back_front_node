//declaration de la constante pour l'export du module fs
const fs = require('fs');
//stockage du chemin vers mon fichier
const myData = "./src/model/todolist.json";

//export de getDataTab permettant d'afficher les données contenus dans le tableau done
exports.getDataTab = (request, response) => {
    //Methode readFile pour lire le fichier
    fs.readFile(myData, (err, data) => {
        //Si erreur
        if(err) {
            //Erreur status 500 + message
            response.status(500).json({
                message: 'Erreur de lecture',
                error: err
            })
        //sinon
        } else {
            //Status 200 + datas du tableau todo au format json
            response.status(200).json(JSON.parse(data).done)
        }
    })
}

//export de getDataById permettant de récupérer une donnée par son id
exports.getDataById = (request, response) => {
    //lecture du fichier todolist.json
    fs.readFile(myData, (err, data) => {
        //condition si erreur 500
        //Erreur d'écriture avec message
        if(err) {
            response.status(500).json({
                message: "Erreur de lecture",
                Error: err
            })
        //sinon
        } else {
            //on transforme les datas en json pour les manipuler
            const existingData = JSON.parse(data);
            //Recherche dans le fichier si id existe dans le contenu
            const dataById = existingData.done.find((obj) => obj.id === parseInt(request.params.id))
            //Si id trouvée
            if(dataById) {
                //Status 200 + l'objet
                response.status(200).json(dataById)
            //sinon
            } else {
                //Erreur Status 404 + message non trouvé
                response.status(404).json({
                    message: "Pas trouvé cet id"                    
                })
            }
        }
    })
}

//export de getdDataByTitle pour récupérer une donnée par son titre
exports.getDataByTitle = (request, response)=>{
    //lecture des données
    //fs.readFile(chemin, (err,data))
    fs.readFile(myData, (err, data)=>{
        //if erreur
        if(err) {
            //status 500 + message
            response.status(500).json({
                message: "Erreur de lecture",
                error: err
            })
        //sinon
        } else {
            //stockage de la donnée
            //const data = JSON.parse(data)
            const existingData = JSON.parse(data);
            //recherche du titre dans les données et stockage
            //const databytitle = data.tableau.find
            const dataByTitle = existingData.done.find((obj)=> obj.titre.toLowerCase() === request.params.titre.toLowerCase());
            //si donnée trouvé
            if(dataByTitle) {
                //status 200 + donnée
                response.status(200).json(dataByTitle);
            //sinon
            } else {
                //erreur status 404 + message
                response.status(404).json({
                    message: "Ce titre est introuvable"
                })
            }
        }
    });
};

//export de createData pour insérer des données dans mon fichier
exports.createData = (request, response) => {
    //lecture du fichier avec readfile
    fs.readFile(myData, (err, data)=> {
        //condition
        if(err) {
            //si erreur 500 + message
            response.status(500).json({
                message: "Erreur de lecture",
                error: err
            })
        //sinon
        } else {
            //Ajout de la donnée
            const existingData = JSON.parse(data);
            //si tableau vide
            if(existingData.done.length === 0) {
                //tableau = ( id = 1, requete.body) 
                existingData.done.push({ "id": 1, "titre": request.body.titre, "tache": request.body.tache });
            //sinon
            } else {
                //on récupère la dernière entrée du tableau
                let thisData = existingData.done[ existingData.done.length-1 ];
                //tableau = (requete id = id de la dernière entrée + 1 , requete body)
                existingData.done.push({ "id": thisData.id + 1, "titre": request.body.titre, "tache": request.body.tache });
            }
            //Ecriture dans le fichier avec fs writeFile
            fs.writeFile(myData, JSON.stringify(existingData), (writeErr)=>{
                //si Erreur d'écriture
                if(writeErr) {
                    //Erreur status 500 + message
                    response.status(500).json({
                        message: "Erreur d'écriture",
                        error: err
                    })
                //sinon
                } else {
                    //Status 200 + message
                    response.status(200).json({
                        message: "Données ajoutées"
                    })
                } 
            })
        }
    })
};

//export de updateData pour mettre à jour une donnée recupérée par son id
exports.updateData = (request, response) => {
    //lecture du fichier avec fs readFile
    fs.readFile(myData, (err, data)=> {
        //Si erreur de lecture
        if(err) {
            //Erreur 500 + message
            response.status(500).json({
                message: "Erreur de lecture",
                error: err
            })
        //sinon
        } else {
            //Stockage des données existantes dans une constante
            const existingData = JSON.parse(data);
            //recherche dans le fichier si l'id est dans le contenu
            const dataById = existingData.done.find((obj) => obj.id === parseInt(request.params.id));
            //si id non trouvée
            if(!dataById) {
                //Réponse 404 + message
                response.status(404).json({
                    message: "objet non trouvé",
                    error: err
                })
            //sinon
            } else {
                //Remplacement des données par la celles de la requête
                Object.assign(dataById, request.body);
                //Ecriture des nouvelles données avec fs writeFile
                fs.writeFile(myData, JSON.stringify(existingData), (writeErr)=> {
                    //si erreur
                    if(writeErr) {
                        //Erreur 500 + message erreur d'ecriture
                        response.status(500).json({
                            message: "Erreur d'écriture"
                        })
                    //sinon
                    } else {
                        //Status 200 + message
                        response.status(200).json({
                            message: "Données mises à jour"
                        })
                    }
                })
            }
        }
    })
};



//export de deleteDataById pour supprimer une donnée en se basant sur son id et la renvoyer dans le tableau done
exports.deleteDataById = (request, response) => {
    //lecture du fichier avec fs readfile
    fs.readFile(myData, (err, data) => {
        //si erreur de lecture
        if(err) {
            //renvoi de l'erreur status 500 + message
            response.status(500).json({
                message: "Erreur lors de l'ecriture",
                error: err
            })
        //sinon
        } else {
            //stockage de la donnée existante dans une constante
            const existingData = JSON.parse(data);
            //recherche des données à l'id de la requête dans le contenu
            const dataById = existingData.done.find((obj)=> obj.id === parseInt(request.params.id));
            //si on ne trouve pas l'objet avec cette id
            if(!dataById) {
                //renvoi de l'erreur 404 + message pas d'objet
                response.status(404).json({
                    message: "Id est introuvable",
                    error: err
                })
            //sinon
            } else {
                //donnée existante = donnée existante - donnée effacée
                existingData.done = existingData.done.filter((obj)=> obj.id != parseInt(request.params.id)); 
                //Ecriture des nouvelles données avec fs writeFile
                fs.writeFile(myData, JSON.stringify(existingData), (writeErr) => {
                    //si erreur
                    if(writeErr) {
                        //Erreur 500 + message
                        response.status(500).json({
                            message: "Erreur d'écriture",
                            error: err
                        })
                    //sinon
                    } else {
                        //status 200 + message
                        response.status(200).json({
                            message: "Suppression réussie"
                        })
                    }
                });
            }
        }
    });
};