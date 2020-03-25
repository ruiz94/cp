// alert("no mms")
const remote = require('electron').remote
// import { remote } from 'electron'
const main = remote.require('./main.js')


document.getElementById('lol').innerHTML = '123'
// console.log(lol)
console.log("ya stoy arto")
let button = document.createElement('button')
button.innerHTML = "Open Window"
document.body.appendChild(button)

button.addEventListener('click', () => {
    main.openWindow()
})