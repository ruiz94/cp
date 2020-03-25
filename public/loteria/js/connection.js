console.log('Conectandose...')
var numSala = 0, nombreSala = ''
function Conexion(){
    let ws, activado = false
    this.init = function(){
        console.log(activado)
        if(activado)
            return false
        activado = true
        ws = new WebSocket("ws://192.168.72.104:40617")
        ws.onerror = function(){
            console.log("Error en la conexión.")
        }
        ws.onopen = function(){
            ws.send(JSON.stringify({
                evento: 'inicio',
                numSala,
                nombreSala
            }))
        }
        ws.onclose = function(){
            console.log('Se chingo la conexión :(')
            window.location.reload()
        }
        ws.onmessage = function(message){
            var data = JSON.parse(message.data)
            console.log(data)
            switch(data.evento){
                case 'stats':
                    var header = document.querySelector('.loteria .header');
                    header.querySelector('.jugadores span').textContent = data.jugadores
                    header.querySelector('.estatus span').textContent = data.listos? `"Corre y se va"`:'Eligiendo'
                    header.querySelector('.jugador span').textContent = data.Jugador
                    header.querySelector('.numero_sala span').textContent = data.numeroSala
                    header.querySelector('.nombre_sala span').textContent = data.nombreSala
                    if(data.admin)
                        document.querySelector('.loteria .header .btns_reiniciar').classList.add('visible')
                    else
                        document.querySelector('.loteria .header .btns_reiniciar').classList.remove('visible')

                    break
                case 'Podemos empezar?':
                    console.log('Podemos empezar?', data)
                    if(data.listos){
                        document.querySelector('.loteria').classList.add('comenzo_juego')
                        var cartas = document.querySelectorAll(".contenedor_carta .carta_juego img")
                        cartas.forEach(el => {
                            el.setAttribute('draggable', 'false')
                        })
                    }   
                    break
                case 'Elige tabla':
                    document.querySelector('.loteria').classList.add('a_jugar')
                    break
                case 'Juego en curso':
                    console.log('lol ya comenzó')
                    alert('Juego en curso')
                    break
                case 'reiniciar':
                    document.querySelector('.loteria').classList.remove('a_jugar')
                    var cartas = document.querySelectorAll(".contenedor_carta .carta_juego img")
                    cartas.forEach(el => {
                        document.querySelector('.loteria .elegir .baraja').appendChild(el)
                    })
                    con = new Conexion()
                    break
            }
            
        }
    }
    this.send = function(data){
        console.log(data)
        ws.send(JSON.stringify(data))
    }
}
var con = new Conexion()
