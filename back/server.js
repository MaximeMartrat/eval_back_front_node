//recuperation du module app
const app = require('./app');
//stockage du port dans une constante
const port = 3000;
//ecoute du port
app.listen(port, ()=>{
    console.log('L\'application est sur le port ' + port)
})