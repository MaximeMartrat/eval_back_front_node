$(document).ready(() => {
    //recupération de l'url locale
    const apiBaseUrl = "http://localhost:3000/"
    //initialisation d'une variable  à null  pour recupérer valeur des boutons de la nav
    let selectedButtonValue = null
    //ecoute du click du bouton pour récupérer sa valeur (tableau sélectionné)
    $(".selected_button").click(function(){
        selectedButtonValue = $(this).val()
        console.log(selectedButtonValue);
    });
    //fonction pour créer une nouvelle tache
    function createTask() {
        //récupération des valeurs des input
        let taskData = "";
        //si selectedButtonVal === "todo" 
        if(selectedButtonValue === "todo") {
            taskData = { titre: $("#create_todo").val(), tache: $("#todo_task").val() };
        }
        //si selectedButtonVal ==="done" 
        if(selectedButtonValue === "done") {
            taskData = { titre: $("#create_done").val(), tache: $("#done_task").val() };
        }
        $.ajax({
            //requete de type post
            type: "POST",
            //recupération de l'url + valeur du tableau sélectionné
            url: apiBaseUrl + selectedButtonValue,
            //recupération des donnée en chaine de caractère
            data: JSON.stringify(taskData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //si success 
            success: (result) => {
                //envoi de la requete + console.log + message 
                console.log(result)
                alert(result.message)
            },
            //si erreur
            error: (xhr, status, error) => {
                //console.log + message
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + "error: " + error)
            }
        })
    }
    //event listener sur le bouton
    $(".create_button").click(createTask);

    //création de la fonction de recupération de tout le fichier
    function getTodoList() {
        //recupération de la div pour affichage
        const todoList = $("#todolist");
        $.ajax({
            //requete de type get
            type: "GET",
            //recupération de l'url
            url: apiBaseUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //si success
            success: (result) => {
                let todoItems = result.todo;
                let doneItems = result.done;
                //envoi de la requete + creation de deux tableaux pour l'affichage
                let myTab = `<br><h3>A faire</h3>
                <table id="table">
                <tr>
                    <th>N°</th>
                    <th>Titre</th>
                    <th>Description</th>
                </tr>`;
                //pour chaque donnée ajouter dans les cellules du tableau la donnée
                for (let i =0; i < todoItems.length; i++){
                    myTab += '<tr>'
                    myTab += '<td>' + todoItems[i].id + '</td>'
                    myTab += '<td>' + todoItems[i].titre + '</td>'
                    myTab += '<td>' + todoItems[i].tache + '</td>'
                    myTab += '</tr>'
                }
                myTab += `</table>`
                let myTab2 = `<br><h3>Fait</h3>
                <table id="table">
                <tr>
                    <th>N°</th>
                    <th>Titre</th>
                    <th>Description</th>
                </tr>`;
                //pour chaque donnée ajouter dans les cellules du tableau les données
                for (let i = 0; i < doneItems.length; i++){
                    myTab2 += '<tr>'
                    myTab2 += '<td>' + doneItems[i].id + '</td>'
                    myTab2 += '<td>' + doneItems[i].titre + '</td>'
                    myTab2 += '<td>' + doneItems[i].tache + '</td>'
                    myTab2 += '</tr>'
                }
                myTab2 += `</table>`
                //affichage des tableaux dans la div
                todoList.html(myTab + myTab2);
            },
            //si erreur 
            error: (xhr, status, error) => {
                //console.log + message
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + "error: " + error);
            }
        })
    }
    //event listener sur le bouton todolist
    $("#todolist_button").click(getTodoList);

    //creation de la fonction pour appel a la methode de recupération de données par id
    function getTaskById() {
        //initialisation de variable pour recuperation d'input et de la div
        let taskId
        let taskById
        //si tableau = todo
        if(selectedButtonValue === "todo") {
            //input = 
            //div =
           taskId = $("#get_todo").val();
           taskById = $("#todo_post_container");
        }
        //si tableau = done
        if(selectedButtonValue === "done") {
            //input =
            //div =
            taskId = $("#get_done").val();
            taskById = $("#done_post_container");
        }
        $.ajax({
            //requete de type GET
            type: "GET",
            //recuperation de l'url pour le tableau selectionné à l'id sélectionnée
            url: apiBaseUrl + selectedButtonValue + "/" + taskId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //si succès
            success: (result) => {
                //affichage du resultat dans un tableau
                let myTab = `<br><table id="table">
                <tr>
                    <th>N°</th>
                    <th>Titre</th>
                    <th>Année</th>
                </tr>
                <tr>
                    <td> ${result.id} </td>
                    <td> ${result.titre} </td>
                    <td> ${result.tache} </td>
                </tr>
                </table>`;
                //affichage du tableau dans la div
                taskById.html(myTab);
            },
            //si erreur
            error: (xhr, status, error) => {
                //console.log + message
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error);
            }
        })
    }
    //event listener sur le bouton getbyid
    $('.get_by_id_button').click(getTaskById)

    //fonction deleteTask faisant appel aux methodes d'effacement de données
    function deleteTask() {
        //initialisation de variable pour recuperation de l'input
        let deleteId
        //si tableau = todo
        if(selectedButtonValue === "todo") {
            //input = 
           deleteId = $("#get_todo").val();
        }
        //si tableau = done
        if(selectedButtonValue === "done") {
            //input =
            deleteId = $("#get_done").val();
        }
        $.ajax({
            //requete de type Delete
            //recuperation de l'url pour le tableau selectionné à l'id sélectionnée
            type: "DELETE",
            url: apiBaseUrl + selectedButtonValue + '/' + deleteId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //si success
            success: (result) => {
                //message
                alert(result.message)
                getTodoList();
            },
            //si erreur
            error: (xhr, status, error) => {
                //console.log + message
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error)
            }
        })
    }
    //event listener sur le bouton delete
    $(".delete_button").click(deleteTask);

    //fonction updateTask faisant appel aux methode de mise à jour des données
    function updateTask() {
        //initialisation de variable pour recuperation de l'input
        let updateId
        let dataTitre
        let dataTache
        let taskData = {};
        //si tableau = todo
        if(selectedButtonValue === "todo") {
            //input = 
            updateId = $("#id_maj_todo").val();
            if ($("#maj_title_todo").val() !== "") {
                dataTitre = $("#maj_title_todo").val();
                taskData.titre = dataTitre
            }
    
            if ($("#maj_task_todo").val() !== "") {
                dataTache = $("#maj_task_todo").val();
                taskData.tache = dataTache
            }
    
            if ($("#maj_title_todo").val() === "" && $("#maj_task_todo").val() === "") {
                alert("les inputs sont vides");
                return;
            }
        }
        //si tableau = done
        if(selectedButtonValue === "done") {
            //input =
            updateId = $("#id_maj_done").val();
            if ($("#maj_title_done").val() !== "") {
                dataTitre = $("#maj_title_done").val();
                taskData.titre = dataTitre
            }
    
            if ($("#maj_task_done").val() !== "") {
                dataTache = $("#maj_task_done").val();
                taskData.tache = dataTache
            }
    
            if ($("#maj_title_done").val() === "" && $("#maj_task_done").val() === "") {
                alert("les inputs sont vides");
                return;
            }
        }
        $.ajax({
            type: "PUT",
            url: apiBaseUrl + selectedButtonValue + '/' + updateId,
            data: JSON.stringify(taskData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (result) => {
                alert(result.message)
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error)
            }
        })
    }
    //event listener sur le bouton
    $(".update_button").click(updateTask);
})




