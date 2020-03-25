console.log("estoy en process.js")
const electron = require('electron')
const remote = electron.remote
const main = remote.require('./main.js')
const { ipcRenderer } = electron

/** Seccion de los productos */
let btnNuevo = document.getElementById("btn-Nuevo")
btnNuevo.addEventListener('click', function(){
    document.querySelector('html').classList.add('clsBlur')
    main.creatProductWindow()
    // newNotification()
})
const newNotification = () =>{
    myNotification = new Notification('Title', {
        body: 'Lorem Ipsum Dolor Sit Amet'
    })
    myNotification.onclick = () => {
        console.log('Notification clicked')
    }
}
ipcRenderer.on('newProduct', (e, newProduct) => {
    // console.log({e, newProduct})
    let productos = document.querySelector("#productos")
    let template = `
        <div class="producto">
            <span class="close-icon">X</span>
            <div class="nombre">${newProduct.nombre}</div>
            <div class="precio">${newProduct.precio} MNX</div>
            <div class="desc">${newProduct.desc}</div>
        </div>
    `
    productos.innerHTML += template
    // for(let i = 0; i<10; i++){

    // }
    let icons = document.querySelectorAll('.producto')
    icons.forEach(element => {
        // console.log(element)
        element.addEventListener('mouseover', function(){
            // element.querySelector('.close-icon').className += 'visible'
            element.querySelector('.close-icon').classList.add('visible')
        })
        element.addEventListener('mouseout', function(){
            element.querySelector('.close-icon').classList.remove('visible')
        })
        element.querySelector('.close-icon').addEventListener('click', function(e){
            e.target.parentElement.remove()
        })
    });
})
ipcRenderer.on('cerroModal', (e, el) => {
    if (el) {
        document.querySelector('html').className -= 'clsBlur'
    }
})
 


