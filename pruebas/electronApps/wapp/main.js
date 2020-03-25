const electron  = require('electron')
const {app, BrowserWindow, globalShorcut } = electron

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
    });

    mainWindow.setTitle('WhatsApp')
    mainWindow.loadURL('https://web.whatsapp.com/')

    mainWindow.on('close',  () => {
        mainWindow = null
    })
});