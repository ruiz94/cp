function dragStart(ev) {
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target,50,50);
    // console.log(ev)
    return true;
}
  
// these functions prevents default behavior of browser
function dragEnter(ev) {
    event.preventDefault();
    return true;
}
function dragOver(ev) {
    event.preventDefault();
}

// function defined for when drop element on target
function dragDrop() {
    var data = ev.dataTransfer.getData("Text");
    var clases = (ev.target.classList.value).split(" ")
    var padre = ev.target.parentNode
    var clasesPadre = (padre.classList.value).split(' ')
    //si la carta se colocará en la tabla de juego, validamos que no este repetida, y que no sean mas de 16 cartas
    if( clasesPadre.includes('carta_juego') ){
        let validar = cartaJuego.validarCarta(data)
        if(!validar)
            return false
    }
    //hacemos esta validacion para que una carta no se le agregue a una carta, si no que se agregue a la tabla
    if(clases.includes('carta'))
        ev.target.parentNode.appendChild(document.getElementById(data));
    else
        ev.target.appendChild(document.getElementById(data));
    //agregamos la carta al array tabla, en donde se almacenan las cartas que llevará la tabla
    cartaJuego.addCarta()
    ev.stopPropagation();
    return false;
}
function agregarCarta(el){
    console.log(el)
}

document.querySelectorAll('.carta_juego .carts').forEach(function(el){
    el.addEventListener('click', abrirModal)
})
function abrirModal(el){
    console.log(el)
}
function CartaJuego(){
    var tabla = []
    this.inicio = function(val){
        var sala = document.getElementById('numSala').value
        if(val && sala == '' || sala.length > 10)
            return false
        numSala = sala
        var nombre = document.getElementById('nombreSala').value
        if(!val && nombre == '' || nombre.length > 10)
            return false
        nombreSala = nombre
        con.init()
    }
    this.validarCarta = function(data){
        let carta = document.getElementById(data)
        let id = carta.getAttribute('id')
        if( tabla.includes(id) )
            return false
        // console.log(tabla.length)
        if(tabla.length == 16)
            return false
        return true
    }
    this.addCarta = function(){
        // console.log(el)
        tabla = []
        var cartas = document.querySelectorAll(".contenedor_carta .carta_juego img")
        cartas.forEach(el => {
            console.log(el)
            let carta = el.getAttribute('id')
            tabla.push(carta)
        })
    }
    this.getTabla = function(){
        return tabla
    }
    this.jugar = function(){
        console.log(tabla.length)
        if(tabla.length == 16)
            con.send({evento:'AgregarTabla',tabla:this.getTabla()})
    }
}
var cartaJuego = new CartaJuego()

function open_modal(nombre){
    document.querySelector('.contenedor_btn .mod').classList.remove('grande')
    document.querySelector('.contenedor_btn .'+nombre).classList.add('grande')
    document.querySelector('.contenedor_btn').classList.add('_'+nombre)
    // console.log(nombre)
}
function cerrar_modal(nombre){
    document.querySelector('.contenedor_btn .'+nombre).classList.remove('grande')
    document.querySelector('.contenedor_btn').classList.remove('_'+nombre)
}