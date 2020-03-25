require('express-router-group');
var fs = require('fs');
var express = require("express");
var path = require('path');
const app = express();
const router = express.Router();
const WebSocket = require('ws');
const http = require('http');
const mysql = require('mysql');

// var publicPath = path.resolve(__dirname, 'Complete_beginners/introducing_JavaScript_Object/Lanzemos_algunas_pelotas/public');
var publicPath = path.resolve(__dirname, 'public');
// console.log(publicPath);
app.use(router)
// app.use('/static', express.static(__dirname + '/Complete_beginners/introducing_JavaScript_Object/Lanzemos_algunas_pelotas/css'));
app.use(express.static(publicPath));

// app.use(express.static('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'));
app.get("/lolo", function(req, res) {
    res.sendFile(__dirname + '/index.html');
    // res.sendFile(__dirname + '/');
})
app.get("/fetch", function(req, res) {
    res.sendFile(__dirname + '/pruebas/Ejercicio_Fetch/index.html');
    // res.sendFile(__dirname + '/');
})
router.group("/games", (router) => {
    router.get('/pacman', function(req, res){
        res.sendFile(__dirname + '/games/pacman/index.html');
        // res.sendFile(__dirname + '/');
    })
    router.get("/first", function(req, res) {
        res.sendFile(__dirname + '/games/game1/index.html');
        // res.sendFile(__dirname + '/');
    })
    router.get("/bolitas", function(req, res) {
        // var path_bolitas = 'Complete_beginners/introducing_JavaScript_Object/Lanzemos_algunas_pelotas';
        // var publicPath = path.resolve( path.join(__dirname, path_bolitas) );
        // var publicPath = path.resolve(__dirname, 'Complete_beginners/introducing_JavaScript_Object/Lanzemos_algunas_pelotas');
        // app.use(express.static(publicPath));
        res.sendFile(__dirname + '/Complete_beginners/introducing_JavaScript_Object/Lanzemos_algunas_pelotas/index.html');
        // res.sendFile(__dirname + '/Complete_beginners/introducing_JavaScript_Object/Lanzemos_algunas_pelotas/index.html');
        // res.sendFile(__dirname + '/');
    })
});
router.group("/css", (router) => {
    router.get('/', function(req, res){
        res.sendFile(__dirname + '/pruebas/css/index.html');
        // res.sendFile(__dirname + '/');
    })
    router.get('/fb', function(req, res){
        res.sendFile(__dirname + '/pruebas/css/fb/index.html');
        // res.sendFile(__dirname + '/');
    })
    router.group("/sass", (router) => {
        router.get('/', function(req, res){
            res.sendFile(__dirname + '/pruebas/css/sass/index.html');
        })
        router.get('/sass1', function(req, res){
            res.sendFile(__dirname + '/pruebas/css/sass/sass1/sass1.html');
        })
    });
});
router.group("/js", (router) => {
    router.get('/', function(req, res){
        res.sendFile(__dirname + '/pruebas/js/index.html');
        // res.sendFile(__dirname + '/');
    })
    router.get('/todo', function(req, res){
        res.sendFile(__dirname + '/pruebas/js/toDo/index.html');
        // res.sendFile(__dirname + '/');
    })
    router.get('/vueIntro', function(req, res){
        res.sendFile(__dirname + '/pruebas/js/vue/vueIntro/vueIntro.html');
        // res.sendFile(__dirname + '/');
    })
    router.get('/blackhole', function(req, res){
        res.sendFile(__dirname + '/pruebas/js/blackHole/index.html');
        // res.sendFile(__dirname + '/');
    })
});

app.get("/getTabla", function(req, res) {

    fs.readFile('./pruebas/Ejercicio_Fetch/tabla.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            // console.log(typeof data);
            res.send( data );
        }
        // res.sendFile(data)
    })
})

app.get("/componente1", function(req, res) {
    res.sendFile('C:/xampp/htdocs/arl/projects/resources/views/csss/componente1/index.blade.php');
    // res.sendFile(__dirname + '/');
})
router.group('/websocket', (router) => {
    router.get('/', function(req, res){
        res.sendFile(__dirname + '/pruebas/webSockets/index.html')
    })
    router.get("/chat", function(req, res) {
        res.sendFile(__dirname + '/pruebas/webSockets/primeraPractica/index.html');
        // res.sendFile(__dirname + '/');
    })
    router.get("/loteria", function(req, res) {
        res.sendFile(__dirname + '/pruebas/webSockets/loteria/index.html');
        // res.sendFile(__dirname + '/');
    }) 
})


const server = http.createServer(app);
const wss = new WebSocket.Server({ port:40615 });
var clients = [];
var count_user = 0;

var connectionChat
wss.on('connection', (ws) => {
    let socket = ws;
    //connection is up, let's add a simple simple event
    // clients.push({socket:ws, index:clients.length});
    socket.on("close",function(data){
        clients = clients.filter((client)=>{
            return socket != client.socket
        });
    })
    socket.on('message', (message) => {
        var message = JSON.parse(message);
        console.log(typeof message, JSON.stringify(message));
        connectionChat = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'chatgo'
        });
        switch(message.evt){
            case "auth":
                var terminoConexion = false
                new Promise((resolver, rechazar) => {
                    connectionChat.connect(function(err){
                        if(err){
                            rechazar(err)
                        };
                        resolver()
                    });
                })
                .then(() => {
                    new Promise((resolver, rechazar) => {
                        connectionChat.query('SELECT * from usuarios WHERE id_user = "'+message.hostname+'"', function (error, results, fields) {   
                            if (error) rechazar(error);      
                            resolver(results)
                        });
                    })
                    .then((results1) => {
                        //si no encuentra al usuario, lo registra
                        if (!results1.length) {
                            new Promise((resolver, rechazar) => {
                                var avatars = [
                                    'https://caracolacomics.com/3038-large_default/figura-funko-pop-minion.jpg',
                                    'https://pbs.twimg.com/profile_images/782686110270967808/mOvxpDgX.jpg',
                                    'https://i.imgur.com/BnY10A1.jpg',
                                    'https://i.etsystatic.com/10775770/r/il/ac5841/792937691/il_570xN.792937691_ap89.jpg',
                                    'https://www.freepngimg.com/thumb/camera/70747-minion-kevin-stuart-bob-the-minions.png'

                                ]
                                var num = Math.floor(Math.random() * (5 - 0) + 0)
                                connectionChat.query('INSERT INTO usuarios (id_user, nombre, img)VALUES ("'+message.hostname+'","'+message.nombre+'", "'+avatars[num]+'")', function (error, results, fields){
                                    if(error) {
                                        rechazar(error)
                                    }
                                    // console.log("results", results)
                                    resolver(results.insertId)
                                });
                            })
                            .then((id_usuario) => {
    
                                new Promise( (resolver, rechazar) => {
                                    connectionChat.query('SELECT * from usuarios WHERE id = "'+id_usuario+'"', function (error, results) {   
                                        if (error) rechazar(error);      
                                        resolver(results)
                                    });
                                })
                                .then((results)=>{
                                    var existe_cliente = false
                                    let usuario = results[0]
                                    clients.forEach( client => {
                                        if (client.id == usuario.id) {
                                            existe_cliente = true
                                        }
                                    })
                                    if (!existe_cliente) {
                                        clients.push({ id: usuario.id, id_user: usuario.id_user, nombre:usuario.nombre, socket })
                                    }
                                    console.log({clients})
                                    connectionChat.end();
                                    socket.send(JSON.stringify({"evt":"auth", usuario: usuario, count_users: clients.length}));
                                })
                                .catch(()=>{
                                    connectionChat.end();
                                    socket.send(JSON.stringify({"evt":"error_crear_usuario"}));
                                })
                            }) 
                            .catch((error) => {
                                connectionChat.end();
                                socket.send(JSON.stringify({"evt":"error_crear_usuario"}));
                            })
                        }else{
                            // console.log(results1, results1[0].id_user, results1.id_user)
                            let usuario = results1[0]
                            var existe_cliente = false
                            clients.forEach( client => {
                                if (client.id_user == usuario.id_user) {
                                    existe_cliente = true
                                }
                            })
                            if (!existe_cliente) {
                                clients.push({ id: usuario.id, id_user: usuario.id_user, nombre:usuario.nombre, socket })
                            }
                            // console.log({clients})
                            socket.send(JSON.stringify({"evt":"auth", usuario: usuario, count_users: clients.length}));
                            connectionChat.end();
                        }
                        
                    }) 
                    .catch((error) => {
                        connectionChat.end();
                        socket.send(JSON.stringify({"evt":"error_connection"}));
                    })
                })
                .catch((error) => {
                    console.log("error - conexión a DB - Auth", error)
                    connectionChat.end();
                    socket.send(JSON.stringify({"evt":"error_connection"}));
                })
                break;
            case "message":
                console.log(`Hay ${clients.length} usuarios.`)
                // var regxReplace = /[<,>]/ig
                // var elMensaje = message.mensaje.replace(regxReplace, '')
                var elMensaje = message.mensaje
                new Promise((resolver, rechazar)=>{
                    connectionChat.connect(function(err){
                        if(err)
                            rechazar(err)
                            resolver()
                    })
                })
                .then(()=>{
                    new Promise((resolver, rechazar)=>{
                        connectionChat.query(`INSERT INTO mensajes (texto) VALUES ("${elMensaje}")`, function(err, insert){
                            if(err)
                                rechazar(err)
                            resolver(insert)
                        })
                    })
                    .then((insert)=>{
                        console.log(insert)
                        new Promise((resolver, rechazar)=>{
                            connectionChat.query(`INSERT INTO mensajes_from_to (id_mensaje, id_from, id_to, id_grupo)
                                 VALUES ("${insert.insertId}", "${message.id}", "${message.id_to}", "${message.id_grupo}")`, function(err, insertRel){
                                if(err)
                                    rechazar(err)
                                resolver(insertRel)
                            })
                        })
                        .then((insertRel)=>{
                            clients.forEach(client => {
                                let estatus = client.id == message.id ? 1:0;
                                client.socket.send(JSON.stringify({ 
                                    "evt":"mensajeTexo",
                                    nombre:message.nombre,
                                    mensaje:elMensaje ,
                                    count_users: clients.length,
                                    estatus,
                                    time: message.fecha+" "+message.time
                                }));
                            });
                        })
                        .catch(()=>{
                            socket.send(JSON.stringify({
                                evt:'errorMensjae',
                            }))
                        })
                    })
                    .catch((err)=>{
                        console.log("--- error al tratar de insertar un mensaje. ", err)
                        socket.send(JSON.stringify({
                            evt:'errorMensjae',
                        }))
                    })
                })
                .catch(()=>{
                    console.log("--- Error conexión insertar mensaje")
                    socket.send(JSON.stringify({"evt":"error_connection"}));
                })
                
                
                break;
            case "updatePerfil":
                new Promise((resolver, rechazar) => {
                    connectionChat.connect(function(err){
                        if(err) {
                            rechazar()
                        }
                        resolver()
                    });
                })
                .then(() => {
                    var queryUpdate = ''
                    queryUpdate += message.imagen ? 'img = "'+message.imagen+'"' : ''
                    queryUpdate += message.imagen && message.nombre ? ', ' : ''
                    queryUpdate += message.nombre ? 'nombre = "'+message.nombre+'"' : ''
                    new Promise( (resolver2, rechazar2) => {
                        connectionChat.query('UPDATE usuarios SET '+queryUpdate+' WHERE id = "'+message.id+'" ', function(error, results){
                            if (error) {
                                rechazar2(error)
                            }
                            resolver2(results)
                        })
                    })
                    .then(() => {
                        new Promise((resolver3, rechazar3) => {
                            connectionChat.query('SELECT * FROM usuarios WHERE id = "'+message.id+'" ', function(error, results){
                                if (error) {
                                    rechazar3()
                                }
                                resolver3(results)
                            })
                        })
                        .then((results) => {
                            // console.log(results, results[0].id_user)
                            let usuario = results[0]
                            clients.forEach(client => {
                                if (client.socket == socket) {
                                    client.nombre = usuario.nombre
                                }
                            });
                            socket.send(JSON.stringify({"evt":"updatePerfil", usuario:usuario}));
                        })
                        .catch(() => {
                            connectionChat.end();
                            socket.send(JSON.stringify({"evt":"error_connection"}));
                        })
                    })
                    .catch((param) => {
                        connectionChat.end();
                        socket.send(JSON.stringify({"evt":"error_connection"}));
                    })
                })
                .catch(() => {
                    socket.send(JSON.stringify({"evt":"error_connection"}));
                })
                break;
            case "getChats": 
                new Promise( (resolver, rechazar) => {
                    connectionChat.connect(function(err){
                        if(err) {
                            rechazar()
                        }
                        resolver()
                    });
                })
                .then( () => {
                    console.log("resolver")
                    new Promise( (resolver, rechazar) => {
                        connectionChat.query( 'SELECT * FROM mensajes_from_to WHERE id_from = '+message.id+' ', function(error, results){
                            if (error) {
                                rechazar(error)
                            }
                            resolver(results)
                        })
                    })
                    .then( (results) => {
                        var listaChats = []
                        console.log(results.length)
                        var arrResults = [];
                        results.forEach(result=>{
                            arrResults.push( new Promise((onSuccess, onError)=>{
                                if(result.id_to>0){
                                    connectionChat.query( 'SELECT * FROM usuarios WHERE id = '+result.id_to+' ', function(error,usuarios){
                                        if (error) {
                                            onError(error)
                                        }
                                        onSuccess({"data":usuarios[0],es_grupo:false})
                                    })
                                }else{
                                    connectionChat.query( 'SELECT * FROM grupos WHERE id = '+result.id_grupo+' ', function(error, grupos){
                                        if (error) {
                                            onError(error, true)
                                        }
                                        onSuccess({"data":grupos[0],es_grupo:true})
                                        // onSuccess(grupos[0],true)
                                    });
                                }                                
                            }) );
                        });
                        Promise.all(arrResults)
                            .then(function(data, es_grupo){                                
                                console.log(data, es_grupo);
                            })
                            .catch(function(error, es_grupo){
                                console.log("error :V", error,es_grupo);
                            })        
                        

                        // new Promise( (resolver, rechazar) =>{
                                                
                        // })
                        // .then( (listaChat) => {
                        //     console.log({listaChat})
                        // })
                        // .catch( (error) => {
                        //     console.log("error", error)
                        //     socket.send(JSON.stringify({'evt':'error_connection'}))
                        // })
                    })    
                    .catch( (error) => {
                        console.log("error", error)
                        socket.send(JSON.stringify({'evt':'error_connection'}))
                    })
                })
                .catch( () => {
                    socket.send(JSON.stringify({'evt':'error_connection'}))
                })
            // });
            case "getChat":
                console.log('getChat')
                new Promise((resolve, rechazar) => {
                    connectionChat.connect(function(err){
                        if(err){
                            rechazar(err)
                        }
                        resolve()
                    })
                }).then(()=>{
                    console.log("Traemos todos los mensajes de la tabla mensajes_from_to")
                    let es_grupo = message.es_grupo /* ***por mientras traeremos los mensajes que son del grupo, despues ya se recibiran las variables que indiquen si es un grupo o no, de quien es la conversacion, etc.*/
                    let id_grupo = message.id_grupo // ~~> Gruardamos el id del grupo
                    let id_to = message.id_to // ~~> Guardamos el id de la persona de la que se quiere la conversación
                    let query = es_grupo ? 'id_grupo = '+id_grupo : 'id_to ='+id_to
                    new Promise((resolve, rechazar)=>{
                        connectionChat.query(`SELECT mensajes_from_to.id_from, mensajes.texto, mensajes.created_at, usuarios.nombre 
                            FROM mensajes_from_to 
                            INNER JOIN mensajes ON mensajes.id = mensajes_from_to.id_mensaje
                            INNER JOIN usuarios ON usuarios.id = mensajes_from_to.id_from
                            WHERE `+query+` ORDER BY mensajes_from_to.created_at ASC`, function(error, rel_mensajes){
                            if (error)
                                rechazar(error)
                            resolve(rel_mensajes)
                        })
                    }).then((rel_mensajes)=>{
                        console.log(rel_mensajes)
                        rel_mensajes.forEach(function(rel){
                            let estatus = rel.id_from == message.id ? 1:0;
                            let fecha = new Date(rel.created_at)
                            let time = fecha.getDate() +"/"+ (fecha.getMonth() + 1)+"/"+fecha.getFullYear()+" "+fecha.getHours()+':'+fecha.getMinutes()
                            console.log(time)
                            socket.send(JSON.stringify({ 
                                "evt":"mensajeTexo",
                                nombre:rel.nombre,
                                mensaje:rel.texto ,
                                count_users: clients.length,
                                estatus,
                                time: time
                            }));
                        })
                    }).catch((error)=>{
                        console.log("Ocurrió un error con la conexión a la BD mensajes_from_to, case: getChat:mensajes_from_to")
                        console.log(error)
                        socket.send(JSON.stringify({'evt':'error_connection'}))
                    })
                }).catch((err)=>{
                    console.log("Ocurrió un error con la conexión a la BD, case: getChat")
                    console.log(err)
                    socket.send(JSON.stringify({'evt':'error_connection'}))
                })
        }
    });
    console.log(`active clients: ${clients.length}`) 
});

//webSocket Tic Tac Toe
const wsttt = new WebSocket.Server({port:40616});
const partidas = {}, REGISTRADO = 'registrado', ERROR = 'error'
const winers = [
    ['col-1', 'col-2', 'col-3'],
    ['col-1', 'col-5', 'col-9'],
    ['col-1', 'col-4', 'col-7'],
    ['col-2', 'col-5', 'col-8'],
    ['col-3', 'col-6', 'col-9'],
    ['col-4', 'col-5', 'col-6'],
    ['col-7', 'col-8', 'col-9'],
    ['col-3', 'col-5', 'col-7']
]
//ruta del jego 
app.get('/tic-tac-toe', function(req, res){
    res.sendFile(__dirname + '/games/ticTacToe/index.html');
})
wsttt.on('connection', (ws) => {
    var player = {socket:ws};
    // console.log(typeof ws)
    // console.log("Conectado WebSocket Tic Tac Toe")
    ws.on('close',function(data){
        var partida = partidas[player.numeroPartida]
        if(partida){
            partida.players.forEach(function(player){
                player.socket.send(JSON.stringify({
                    evt: 'Salio Jugador'
                }))
            })
            delete partidas[ws.numeroPartida]
        }
        // console.log("Cerro", data, ws.numeroPartida)

    })
    ws.on('message', function(data){
        // console.log(player);
        
        data = JSON.parse(data)
        console.log(data);
        switch(data.evt){
            case 'NuevoJugador':
                console.log("Hola nuevo jugador")
                var partida
                //si ingresa un número de partida
                var numP = data.codigoJuego
                var {playerName} = data
                var test = /^(([a-zA-Z,0-9]+[_\.\@-]?)+){1,20}$/
                if(!test.test(playerName)){
                    ws.send(JSON.stringify({
                        evt: 'No Valido',
                        ms: 'La cagas'
                    }))
                    return false
                }
                playerName = playerName.replace(/[<>,=()]/g, ' ')
                playerName = playerName.trim()
                // if(playerName.length > 20 || !playerName.length){
                //     ws.send(JSON.stringify({
                //         evt: 'No Valido',
                //         ms: 'La cagas'
                //     }))
                //     return false
                // }
                if(numP){
                    console.log("trae partida")
                    partida = partidas[numP]
                    //si la partida ya esta completa no puede unirse
                    if(partida && partida.players.length == 2){
                        ws.send(JSON.stringify({
                            evt: ERROR,
                            ms: 'Partida completa'
                        }))
                        return false
                    }
                }else{
                    var existe = false
                    for(key in partidas){
                        partidas[key].players.forEach((player) => {
                            if(player.socket == ws){
                                ws.send(JSON.stringify({
                                    evt: ERROR,
                                    ms:'Ya Registrado'
                                }))
                                existe = true
                                return
                            }
                        })
                    }
                    if(!existe){
                        numP = Math.random().toString(32).slice(-10)
                        partida = partidas[numP] = {players:[], empates: 0, empate:0, gano: false}
                    }else{
                        return false
                    }
                }
                if(!partida){
                    ws.send(JSON.stringify({
                        evt: ERROR,
                        ms: 'Partida no encontrada'
                    }))
                    return false
                }

                player = {...player, numeroPartida:numP,playerName: String(playerName), elejidos:[], wins:0, idPlayer:partida.players.length}
                partida.players.push(player)

                ws.send(JSON.stringify({
                        evt: REGISTRADO,
                        idPlayer: player.idPlayer,
                        playerName: playerName,
                        partida: numP,
                }) );
                if(partida.players.length >= 2){
                    partida.players.forEach((player, id) => {
                        // var key = id? 0 : 1
                        player.socket.send(JSON.stringify({
                            evt: 'Jugadores Completos',
                            idPlayer: player.idPlayer ? 0:1,
                            rival:partida.players[player.idPlayer ? 0:1].playerName
                        }))
                    })
                }
                break
            case 'onLoad':
                for(key in partidas){
                    partidas[key].players.some((player) => {
                        if(player.socket == ws){
                            partidas[player.numeroPartida].players.forEach(function(pl){
                                ws.send(JSON.stringify({
                                    evt: 'Salio Jugador'
                                }))
                            })
                            delete partidas[key]
                            return true
                        }
                    })
                }
                break
            case 'comenzar':
                console.log("llego a evento comenzar")
                var rol = Math.floor( ( Math.random() * (2 - 0) ) + 0) ? 'X': 'O'
                var turno = Math.floor( ( Math.random() * (2 - 0) ) + 0) ? 1: 0
                
                partida = partidas[player.numeroPartida]
                if(!partida){
                    ws.send(JSON.stringify({
                        evt: ERROR,
                        ms: 'No se encontro partida'
                    }))
                    return false
                }
                partida.empate = 0
                partida.gano = false
                partida.players[0].rol = rol ?'X': 'O'
                partida.players[0].turno = turno ? 1: 0
                partida.players[1].rol = rol ? 'O': 'X'
                partida.players[1].turno = turno ? 0: 1

                var players = []
                partida.players.forEach((player)=>{
                    player.socket.send(JSON.stringify({
                        evt: 'Comenzar',
                        idPlayer: player.idPlayer,
                        idRival: player.idPlayer ? 0 : 1,
                        rol: player.rol,
                        turno: player.turno,
                        wins: player.wins,
                        winsRival: player.idPlayer ? partida.players[0].wins : partida.players[1].wins,
                        empates: partida.empates
                    }))
                })
                break
            case 'CambioTurno':
                partida = partidas[player.numeroPartida]
                if(!partida ){
                    player.socket.send(JSON.stringify({evt:ERROR, ms:'No se encontro la partida'}))
                    return false
                }
                if(!partida.players[player.idPlayer].turno){
                    player.socket.send(JSON.stringify({evt:ERROR, ms:"No es tu turno"}))
                    return false
                }
                partida.players[player.idPlayer].turno = 0
                partida.players[player.idPlayer ? 0:1].turno = 1

                partida.empate++
                //validar que el label que quieran agregar no hay asido ya agregado con anterioridad
                partida.players[player.idPlayer].elejidos.push(data.idLabel)
                var jugadorGanador = 0
                partida.players.forEach(function(player){
                    winers.some(function(win){
                        wiin = 0
                        win.forEach(function(w){
                            if(player.elejidos.includes(w))
                                wiin++
                        })
                        if(wiin == 3){
                            player.wins++
                            jugadorGanador = player.idPlayer
                            partida.gano = true
                            return true
                        }
                    })
                })
                if(partida.empate >= 9){
                    partida.empates++
                }
                partida.players.forEach(function(player, id){
                    if(partida.gano || partida.empate >= 9)
                        player.elejidos = []

                    player.socket.send(JSON.stringify({
                        evt: 'CambioTurno',
                        rol: player.rol,
                        idLabel: data.idLabel,
                        gano: partida.gano,
                        turno: player.turno,
                        playerGanador: player.idPlayer == jugadorGanador,
                        empate: partida.empate >= 9,
                        
                    }))
                })
                break
           
            default:
                console.log('Sin evento')
                break
        }
    })
})

app.listen("8080", function() {
    console.log("Servidor listo.");
})

//Parte del servidor para el juego de la loteria Mexicana

const wslot = new WebSocket.Server({port:40617})
//constantes para el jugador
const ELIGIENDO = 0,
      LISTO = 1,
      GANO = 2
let Jugadores = [], salas = {}
// var loteria = new Loteria()
wslot.on('connection', (ws) => {
    var wsJugador = ws
    ws.on('close', function(data){
        //~~> eliminamos el jugador que acabe con la conexión
        var numSala = wsJugador.numSala
        // console.log(numSala, wsJugador)
        if(!numSala)
            return false
        // console.log("------------ Eliminar ________________")
        var sala = salas[numSala]
        sala.jugadores.some((jugador, key) =>{
            // console.log(key,jugador.socket == wsJugador)
            if(jugador.socket == wsJugador)
                sala.jugadores.splice(key, 1)
        })
        if(sala.jugadores.length == 0){
            delete salas[numSala]
            return false
        }
        // console.log("------------ Eliminar ________________")
        sala.loteria.sendStats(sala)
    })
    ws.on('message', function(data){
        let datos = JSON.parse(data)
        console.log({datos,wsJugador})
        switch(datos.evento){
            case 'reiniciar':
                if(Jugadores[0].socket == wsJugador){
                    Jugadores.some((jugador, key) => {
                        jugador.socket.send(JSON.stringify({
                            'evento':'reiniciar', 
                            'admin': jugador.admin
                        }))
                    })
                    loteria.reiniciar()
                }
                break
            case 'inicio':
                var numSala = wsJugador.numSala? wsJugador.numSala : datos.numSala
                
                var sala = salas[numSala]
                var nombreSala = datos.nombreSala?datos.nombreSala:sala.nombreSala
                if(!sala){
                    numSala = Math.random().toString(32).slice(-10)
                    sala = salas[numSala] = {
                        nombreSala: nombreSala,
                        jugadores:[],
                        cartasCantadas:[],
                        loteria: new Loteria()
                    }
                }
                wsJugador.numSala = numSala
                wsJugador.nombreSala = nombreSala
                
                if(!sala.loteria.getStatus()){
                    sala.jugadores.push({
                        socket: wsJugador,
                        estatus: ELIGIENDO,
                        tabla: [],
                        numSala: numSala
                    }) 
                    console.log('._. ._. ._. ._. ._. ._. ._. ._. ._. ._. ')
                    wsJugador.send(JSON.stringify({evento:'Elige tabla'}))
                    // if(!wsJugador.numeroJugador){
                    // }
                    sala.loteria.sendStats(sala)
                }else{
                    wsJugador.send(JSON.stringify({evento:'Juego en curso'}))
                }
                // console.log({salas}, sala.jugadores)
                break
            case 'AgregarTabla':
                // console.log('AgregarTabla', datos)
                var id = 0
                Jugadores.some((jugador, key) => {
                    if(jugador.socket == wsJugador){
                        id = key
                        jugador.estatus = LISTO
                        jugador.tabla = datos.tabla
                        return true
                    }
                })
                // console.log('cambio estatus', Jugadores[id])
                loteria.sendStats()
                loteria.empezarJuego()
                break

        }
    })
})
function Loteria(){
    const INICIO = 0,
          EN_CURSO = 1,
          TERMINADO = 2

    var estatus = 0//indica el estatus del juego
    //se encian los estatus de como va el juego
    this.sendStats = function(sala){
        // console.log(sala)
        sala.jugadores.some((jugador, key) => {
            var numeroJugador = 'J-'+key
            jugador['numeroJugador'] = jugador.socket.numeroJugador = numeroJugador
            jugador.admin = key == 0
            jugador.socket.send(JSON.stringify({
                'evento':'stats', 
                'jugadores':sala.jugadores.length, 
                "Jugador":numeroJugador, 
                'admin': jugador.admin,
                'nombreSala': sala.nombreSala,
                'numeroSala': jugador.numSala
            }))
        })
    }
    //se obiene el estatus del juego
    this.getStatus = function(dat){
        return estatus
    }
    //validamos si ya se puede empezar el juego
    this.empezarJuego = function(){
        estatus = EN_CURSO
        if(Jugadores.length >= 2){
            Jugadores.some((jugador, key) => {
                if(jugador.estatus == ELIGIENDO){
                    estatus = INICIO
                    return true
                }
            })
            Jugadores.some((jugador, key) => {
                jugador.socket.send(JSON.stringify({
                    'evento':'Podemos empezar?', 
                    "listos": estatus
                }))
            })
        }else{
            estatus = INICIO
            Jugadores[0].socket.send(JSON.stringify({
                'evento':'message', 
                "mensaje": 'Se requieren mas jugadores'
            }))
        }
    }
    this.reiniciar = function(){
        Jugadores = []
        estatus = INICIO
        return true
    }
}