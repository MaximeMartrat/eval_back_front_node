$(document).ready(() => {
    
    //recupération de l'url locale
    const apiBaseUrl = "http://localhost:3000/"
    //initialisation d'une variable  à null  pour recupérer valeur des boutons de la nav
    let selectedButtonValue = null

    //ecoute du click du bouton pour récupérer sa valeur (tableau sélectionné)
    $(".selected_button").click(function(){
        selectedButtonValue = $(this).val()
    });

    //listener du bouton todo_button pour afficher la todo
    $("#todo_button").click(function() {
        getTodoDone()
        $("#todolist").css('display', 'none');
        $("#done").css("display", "none");
        $("#todo").css("display", "grid");
    })
    
    //listener du bouton done_button pour afficher la done
    $("#done_button").click(function() {
        getTodoDone()
        $("#todo").css("display", "none")
        $("#todolist").css('display', 'none')
        $("#done").css("display", "grid")
    })
    

    //fonction pour créer une nouvelle tache
    function createTask() {
        //récupération des valeurs des input
        let taskData = "";
        //si selectedButtonVal === "todo" 
        if(selectedButtonValue === "todo") {
            if ($("#create_todo").val() === "" || $("#todo_task").val() === ""){
                alert("Vous n'avez pas rempli tous les inputs")
                return;
            } else {
                taskData = { titre: $("#create_todo").val(), tache: $("#todo_task").val() };
            }
        }
        //si selectedButtonVal ==="done" 
        if(selectedButtonValue === "done") {
            if ($("#create_done").val() === "" || $("#done_task").val() === "") {
                alert("Vous n'avez pas rempli tous les inputs")
                return;
            } else {
                taskData = { titre: $("#create_done").val(), tache: $("#done_task").val() };
            }
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
                getTodoList();
                getTodoDone();
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
    

    //Fonction de recupération de tout le fichier pour affichage dans todolist
    function getTodoList() {
        //recupération de la div todolist pour affichage
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
                let myTab = `<br><h3>TODO</h3><br>
                <table id="table">
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                </tr>`;
                //pour chaque donnée ajouter dans les cellules du tableau la donnée
                for (let i =0; i < todoItems.length; i++){
                    myTab += '<tr>'
                    myTab += '<td class="todolist_titre" >' + todoItems[i].titre + '</td>'
                    myTab += '<td class="todolist_task" >' + todoItems[i].tache + '</td>'
                    myTab += '</tr>'
                }
                myTab += `</table>`
                let myTab2 = `<br><h3>DONE</h3><br>
                <table id="table">
                <tr>
                <th>Titre</th>
                <th>Description</th>
                </tr>`;
                //pour chaque donnée ajouter dans les cellules du tableau les données
                for (let i = 0; i < doneItems.length; i++){
                    myTab2 += '<tr>' 
                    myTab2 += '<td class="todolist_titre">' + doneItems[i].titre + '</td>'
                    myTab2 += '<td class="todolist_task">' + doneItems[i].tache + '</td>'
                    myTab2 += '</tr>'
                }
                myTab2 += `</table><br/>`
                
                todoList.html(myTab + myTab2)
                
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
    $("#todolist_button").click(function() { 
        $("#todolist").css('display', 'grid');
        $("#done").css("display", "none");
        $("#todo").css("display", "none");
        getTodoList();
    });

    //Fonction de recupération de tout le fichier pour affichage dans todo et done
    function getTodoDone() {
        //recupération des div todo et done pour affichage
        const todoTab = $("#todo_tab");
        const doneTab = $("#done_tab");
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
                let newTab = `<br><h3>TODO</h3><br>
                <table id="table">
                <tr>
                    <th>Titre</th>
                    <th colspan="3">Description</th>
                </tr>`;
                //pour chaque donnée => cellules du tableau  + la données
                for (let i =0; i < todoItems.length; i++){
                    console.log(todoItems[i].id)
                    newTab += '<tr>'
                    newTab += '<td class="todo_titre todo_titre' + todoItems[i].id + '" >' + todoItems[i].titre + '</td>'
                    newTab += '<td class="todo_task todo_task' + todoItems[i].id + '" >' + todoItems[i].tache + '</td>'                                   
                    newTab += '<td class="td_radio radio' + todoItems[i].id + '"><input class="todo_radio" type="radio" name="todo_check" value="' + todoItems[i].id + '"></td>'
                    newTab += '<td class="td-delete delete_class' + todoItems[i].id + '"><button class="delete_button" class_delete_button'+ todoItems[i].id + '"><i class="fa-solid fa-trash-can"></i></button></td>'                
                    newTab += '</tr>'
                }
                newTab += `</table>`
                let newTab2 = `<br><h3>DONE</h3><br>
                <table id="table">
                <tr>
                <th>Titre</th>
                <th colspan="3">Description</th>
                </tr>`;
                //pour chaque donnée => cellules du tableau + données
                for (let i = 0; i < doneItems.length; i++){
                    newTab2 += '<tr>' 
                    newTab2 += '<td class="done_titre done_titre' + doneItems[i].id + '" >' + doneItems[i].titre + '</td>'
                    newTab2 += '<td class="done_task done_task' + doneItems[i].id + '" >' + doneItems[i].tache + '</td>'
                    newTab2 += '<td class="td_radio radio_done' + doneItems[i].id + '"><input class="done_radio" type="radio" name="done_check" value="' + doneItems[i].id + '"></td>'
                    newTab2 += '<td class="td-delete delete_done' + doneItems[i].id + '"><button class="delete_button delete_button'+ doneItems[i].id + '"><i class="fa-solid fa-trash-can"></i></button></td>'
                    newTab2 += '</tr>'
                }
                newTab2 += `</table><br/>`
                
                todoTab.html(newTab);
                doneTab.html(newTab2);
                radioListener()
                $(".delete_button").click(deleteTask);
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
    //fonction d'ecoute des input radio
    function radioListener() {
        //listener du bouton radio pour changement de background des td associés
        $('.todo_radio').click(function(){
            let id = $(this).val();
            //rendre non cliquable tous les boutons delete
            $('.delete_button').prop('disabled', true);
            //rendre cliquable le bouton delete qui est dans le meme tr que le radio checked
            $(this).closest('tr').find('.delete_button').prop('disabled', false);
            $(".td_radio").css({'background-color':'white'})
            $(".todo_titre").css({'background-color':'white', 'color':'#3D4592'});
            $(".todo_task").css({'background-color':'white', 'color':'#3D4592'});
            $(".td-delete").css({'background-color':'white'});
            $(".radio" + id).css({'background-color':'#F0F1FA'});
            $(".delete_class" + id).css({'background-color':'#F0F1FA'});
            $(".todo_titre" + id).css({'background-color':'#F0F1FA', 'color':'#3D4592'});
            $(".todo_task" + id).css({'background-color':'#F0F1FA', 'color':'#3D4592'});
        });
        //listener du bouton radio
        $('.done_radio').click(function(){
            //recuperation de la valeur de radio pour changement de background des td associés
            let id = $(this).val();
            //rendre non cliquable tous les boutons delete
            $('.delete_button').prop('disabled', true);
            //rendre cliquable le bouton delete qui est dans le meme tr que le radio checked
            $(this).closest('tr').find('.delete_button').prop('disabled', false);
            $(".td_radio").css({'background-color':'white'});
            $(".done_titre").css({'background-color':'white', 'color':'#3D4592'});
            $(".done_task").css({'background-color':"white", 'color':'#3D4592'});
            $(".td-delete").css({'background-color':'white'});
            $(".radio_done" + id).css({'background-color':'#F0F1FA'});
            $(".delete_done" + id).css({'background-color':'#F0F1FA'});
            $(".done_titre" + id).css({'background-color':'#F0F1FA', 'color':'#3D4592'});
            $(".done_task" + id).css({'background-color':'#F0F1FA', 'color':'#3D4592'});
        });
    }


    //Fonction deleteTask faisant appel aux methodes d'effacement de données
    function deleteTask() {
        //initialisation de variable pour recuperation de l'input
        let deleteId
        //si tableau = todo
        if(selectedButtonValue === "todo") {
           if($('input[name=todo_check]:checked').length === 0){
                //message erreur
                alert("Vous n'avez pas sélectionné d'élément");
                return;
           } else {
                //id = radio checked value
                deleteId = $('input[name=todo_check]:checked').val();
            }
        }
        //si tableau = done
        if(selectedButtonValue === "done") {
            // si aucun bouton radio n'est checké
            if($('input[name=done_check]:checked').length === 0) {
                //message erreur
                alert("Vous n'avez pas sélectionné d'élément");
                return;
            } else {
                //id = radio checked value
                deleteId = $('input[name=done_check]:checked').val();
            }
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
                getTodoDone();
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


    //Fonction updateTask faisant appel aux methode de mise à jour des données
    function updateTask() {
        //initialisation de variable pour recuperation de l'input
        let updateId
        let dataTitre
        let dataTache
        let taskData = {};
        //si tableau = todo
        if(selectedButtonValue === "todo") {
            //id = radio checked value
            updateId = $('input[name=todo_check]:checked').val();
            //si input titre n'est pas vide
            if($("#maj_title_todo").val() !== "") {
                //donnee.titre = input titre
                dataTitre = $("#maj_title_todo").val();
                taskData.titre = dataTitre
            }
            //si input task n'est pas vide
            if($("#maj_task_todo").val() !== "") {
                //donnee.task = input task
                dataTache = $("#maj_task_todo").val();
                taskData.tache = dataTache
            }
            //si aucun input n'est rempli
            if($("#maj_title_todo").val() === "" && $("#maj_task_todo").val() === "") {
                //message d'erreur
                alert("les inputs sont vides");
                return;
            }
            //si aucun radio button n'est coché
            if ($('input[type=radio]:checked').length === 0) {
                //message d'erreur
                alert("aucun élément n'a été sélectionné")
                return;
            }

        }
        //si tableau = done
        if(selectedButtonValue === "done") {
            //id = radio checked value
            updateId = $('input[name=done_check]:checked').val();
            //si input titre n'est pas vide
            if ($("#maj_title_done").val() !== "") {
                //donnee.titre = input titre
                dataTitre = $("#maj_title_done").val();
                taskData.titre = dataTitre
            }
            //si input task n'est pas vide
            if ($("#maj_task_done").val() !== "") {
                //donnee.task = input task
                dataTache = $("#maj_task_done").val();
                taskData.tache = dataTache
            }
            //si aucun input n'est rempli
            if ($("#maj_title_done").val() === "" && $("#maj_task_done").val() === "") {
                //message d'erreur
                alert("les inputs sont vides");
                return;
            }
        }
        $.ajax({
            //requete de type Put
            type: "PUT",
            //recuperation de l'url pour le tableau selectionné à l'id sélectionnée
            url: apiBaseUrl + selectedButtonValue + '/' + updateId,
            data: JSON.stringify(taskData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //si success
            success: (result) => {
                //message
                alert(result.message)
                //affichage des données mises à jour
                getTodoList();
                getTodoDone();
            },
            //sinon erreur
            error: (xhr, status, error) => {
                //message d'alerte
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




