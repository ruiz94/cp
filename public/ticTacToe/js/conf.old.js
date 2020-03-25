// import { resolveSoa } from "dns"

function iniciarConexion(){
    var ws
    ws = new WebSocket('ws://192.168.72.104:40616')
    ws.onopen = function(){
        toggleClass()
        init.sendMessage({
            evt:'onLoad'
        })
        // ws.send(JSON.stringify({
        //     evt:'onLoad'
        // }))
    }
    ws.onmessage = function(message){
        var respuesta = JSON.parse(message.data)
        // console.log("Respuesta del servidor", {respuesta})
        switch(respuesta.evt){
            case "registrado":
                toggleClass()
                document.querySelector('.jugador'+respuesta.idPlayer+' .nombre').innerHTML = respuesta.playerName
                document.querySelector('.tit .numero').innerHTML = respuesta.partida
                break
            case "Jugadores Completos":
                document.querySelector('.jugador'+respuesta.idPlayer+' .nombre').innerHTML = respuesta.rival
                if(respuesta.idPlayer)
                    comenzar()
                break
            case 'Comenzar':
                limpiarTablero()
                var lab = respuesta.rol == 'O' ? 'cero':'equis';
                document.querySelectorAll('.tablero .col').forEach(function(el){
                    el.classList.add(lab)
                })
                if(respuesta.turno)
                    document.querySelector('.tablero').classList.remove('stop')
                document.querySelector('.partida .stats .jugador'+respuesta.idPlayer+' .nombre').classList.add('turno')
                document.querySelector('.partida .stats .tit .empates').innerHTML = respuesta.empates
                document.querySelector('.partida .stats .jugador'+respuesta.idPlayer+' .wins').innerHTML = respuesta.wins
                document.querySelector('.partida .stats .jugador'+respuesta.idRival+' .wins').innerHTML = respuesta.winsRival
                break
            case 'CambioTurno':
                if(respuesta.turno){
                    document.querySelector('.tablero').classList.remove('stop')
                    document.getElementById(respuesta.idLabel).classList.remove('equis', 'cero')
                    document.getElementById(respuesta.idLabel).classList.add('mark', respuesta.rol == 'O' ? 'equis' : 'cero')
                }
                if(respuesta.gano){
                    document.querySelector('.tablero').classList.add('stop')
                    document.querySelector('.winer .banda .texto').innerHTML = respuesta.playerGanador ? 'Has Ganado ¡Felicidades!':'Has Perdido, Suerte para la proxima'
                    document.querySelector('.winer .banda').classList.add(respuesta.playerGanador ? 'winner':'loser')
                    document.querySelector('.winer').classList.add('show')
                }
                if(respuesta.empate){
                    document.querySelector('.winer .banda .texto').innerHTML = 'Empate. Reiniciar en'
                    document.querySelector('.winer .banda').classList.add('empate')
                    document.querySelector('.winer').classList.add('show')
                    clock('empate')
                }
                break
            case 'Salio Jugador':
                document.querySelector('.winer .banda .texto').innerHTML = 'Competidor Salio'
                document.querySelector('.winer .banda').classList.add('salio')
                document.querySelector('.winer').classList.add('show')
                clock('salio')
                break
            case 'error':
                console.log(respuesta.ms)
            case 'No Valido':
                document.querySelector('.winer .banda .texto').innerHTML = 'Nombre no valido'
                document.querySelector('.winer .banda').classList.add('NoValido')
                document.querySelector('.winer').classList.add('show')
                setTimeout(function(){
                    document.getElementById("playerName").value = ''
                    document.getElementById('codigoJuego').value = ''
                    document.querySelector('.winer').classList.remove('show')
                    document.querySelector('.winer .banda').classList.remove('NoValido')
                }, 2000)
                break
        }
    }
    ws.onclose = function(){
        console.log("Conexión terminada")
        document.querySelector('.winer .banda .texto').innerHTML = 'Conexión terminada'
        document.querySelector('.winer .banda').classList.add('NoValido')
        document.querySelector('.winer').classList.add('show')
    }
    this.sendMessage = function(message){
        ws.send(JSON.stringify(message))
    }
}
document.getElementById('jugar').addEventListener('click', function(){
    var playerName = document.getElementById("playerName").value
    var codigoJuego = document.getElementById('codigoJuego').value
    var message = {
        evt: 'NuevoJugador',
        playerName,
        codigoJuego
    }
    init.sendMessage(message)
    // ws.send(JSON.stringify(message))
})
function toggleClass(){
    document.querySelector('.iniciar').classList.toggle('show')
    document.querySelector('.partida').classList.toggle('show')
}
function comenzar(){
    init.sendMessage({
        evt: 'comenzar',
    })
}
document.querySelectorAll('.tablero .col').forEach(function(el){
    el.addEventListener('click', function(){
        var idLabel = el.getAttribute("id");
        el.classList.add('mark')
        document.querySelector('.tablero').classList.add('stop')
        init.sendMessage({
            evt: 'CambioTurno',
            idLabel,
        })
    })
})
document.querySelector('.winer .banda').addEventListener('click', function(elemento){
    var el = elemento.target
    var clases = el.classList['value']
    if(!clases.includes('empate') && !clases.includes('salio') && clases.includes('winner'))
        comenzar()
})
function limpiarTablero(){
    document.querySelector('.tablero').classList.add('stop')
    document.querySelectorAll('.tablero .col').forEach(function(el){
        el.classList.remove('equis', 'cero', 'mark')
    })
    document.querySelector('.winer').classList.remove('show')
    document.querySelector('.winer .banda').classList.remove('winner', 'loser', 'empate', 'salio', 'NoValido')
    document.querySelector('.clock').innerHTML = ''
}
function clock(clase){
    var time = 5
    var clock = setInterval(function(){
        document.querySelector('.clock').innerHTML = time
        time--
        if(time < 0){
            clearInterval(clock)
            if(clase == 'empate')
                comenzar()
            else 
                window.location.reload()
        }
    }, 1000)
}
const init = new iniciarConexion()
// init.iniciarConexion()