const electron = require('electron')
const {app, BrowserWindow} = electron

const path = require('path')
const url = require('url')
const log = require('electron-log');

let win 
 
log.info('Hello Electron');

function createWindow(){
    win = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences:{nodeIntegration:true},
        resizable: false,
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))
    // win.removeMenu()
    // win.setMenuBarVisibility(false)
    win.webContents.openDevTools()
}
exports.openWindow = () => {
    let newWin = new BrowserWindow({width: 400, height: 200, parent: win, modal: true, resizable: false})
    newWin.loadURL(url.format({
        pathname: path.join(__dirname, 'persona.html'),
        protocol: 'file',
        slashes: true
    }))
    newWin.setMenuBarVisibility(false)
}
app.on('ready', createWindow)