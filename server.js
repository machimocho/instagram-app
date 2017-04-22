//CARGAR LOS PAQUETES
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();

//CONFIGURAR LA APP
//Indicarle a node donde buscar los recursos
app.use(express.static(__dirname + '/public'));

//Establecer el motor de vista
app.set('view engine', 'ejs');

//configurar la app instragram con el ID de cliente
// configure instagram app with client_id, client_secret, and access_token
ig.use({
    // get access token here: http://instagram.pixelunion.net/
    access_token: '5363864262.1677ed0.5c393e1944c24814ac60b62f8b33bf29',
});
// alternatively we can use the client_id and client_secret
// for now we'll use the access_token way
//ig.use({
// get these from when we create our app as an instagram developer
// https://www.instagram.com/developer/
//client_id: ' 17fcf5fc88b847b28ffa10eb0141aa44',
//client_secret: ' 39c9e051dff44c83a8baee835cd627de'
//});

//ESTABLECER LA RUTAS
//página inicial - imágenes de perfil
app.get('/', function(req, res) {

    //usar el paquete instagram para obtener los datos del perfil
    // use the instagram package to get popular media
    ig.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
        // render the home page and pass in the popular images
        res.render('pages/index', {
            grams: medias
        });
    });
});

//INICIAR EL SERVIDOR
app.listen(8080);
console.log('App Iniciada. Ir a http://localhost:8080');
