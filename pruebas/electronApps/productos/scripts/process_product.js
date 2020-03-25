const electron = require('electron')
const remote = electron.remote
const main = remote.require('./main.js')
const { ipcRenderer } = electron

let closeWidow = document.getElementById("closeWidow")
closeWidow.addEventListener('click', function(){
    cerrarModal()
})
const cerrarModal = () => {
    console.log("cerro modal")
    main.seCerroModal()
    let currentWindow = remote.getCurrentWindow()
    currentWindow.close()
}

let guardar = document.querySelector("#submit")
guardar.addEventListener('click', function(){
    let nombre = document.querySelector("#nombre").value
    let precio = document.querySelector("#precio").value
    let desc = document.querySelector("#desc").value
    if (nombre == '' || precio == '' || desc == '') {
        myNotification = new Notification('Formulario', {
            body: 'Debes de llenar todos los campos.'
        })
        return false;
    }
    console.log(desc.length)
    if (desc.length > 120) {
        myNotification = new Notification('Formulario', {
            body: 'La descripción solo puede ser de 120 carácteres.'
        })
        return false
    }
    if (nombre.length > 20) {
        myNotification = new Notification('Formulario', {
            body: 'El nombre solo puede ser de 20 carácteres.'
        })
        return false
    }
    let newProduct = {
        nombre: nombre,
        precio: precio,
        desc: desc
    }
    ipcRenderer.send('newProduct', newProduct)
    cerrarModal()
})
