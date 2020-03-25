const electron = require('electron')
const {app, BrowserWindow, Menu, ipcMain} = electron
const url = require('url')
const path = require('path')

// console.log(__dirname)
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../../node_modules', '.bin', 'electron')
    })
}
let win
let winProducto

const createWindow = () =>{
    win = new BrowserWindow({
        width: 1000,
        height: 700,
        resizable: false,
        fullscreenable: false,
        webPreferences:{nodeIntegration:true},
        // show: false
    });
    // win.removeMenu()
    // win.setMenu(null)
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
    // win.webContents.openDevTools()
    win.once('ready-to-show', () => {
        win.show()
        // win.setMenuBarVisibility(false)
    })
    win.on('closed', () => {
        app.quit()
    })
}
Menu.setApplicationMenu(null)
exports.creatProductWindow = () => {
    winProducto = new BrowserWindow({
        width: 500,
        height: 400,
        title: 'Add Product',
        parent: win,
        modal: true,
        resizable: false,
        movable: false,
        minimizable: false,
        frame: false,
        webPreferences:{nodeIntegration:true},
        show: false
    });
    // winProducto.setMenuBarVisibility(false)
    winProducto.loadURL(url.format({
        pathname: path.join(__dirname, 'views/producto.html'),
        protocol: 'file',
        slashes: true
    }))
    //colocamos la ventana hija/modal al centro del padre
    let posicionPadre = win.getBounds()
    // console.log(win.webContents.browserWindowOptions)
    let width_ = (posicionPadre.width / 4)+posicionPadre.x
    let height_ = (posicionPadre.height / 4)+posicionPadre.y
    // console.log(posicionPadre, width_, height_)
    winProducto.setBounds({ x: width_, y: height_})
    // console.log( Notification.isSupported())
    // winProducto.webContents.openDevTools()
    winProducto.on('closed', () => {
        winProducto = null
    })
    winProducto.on('ready-to-show', () => {
        winProducto.show()
    })
}
exports.seCerroModal = () => {
    win.webContents.send('cerroModal', true)
}
ipcMain.on('newProduct', (e, newProduct) => {
    // console.log(newProduct)
    win.webContents.send('newProduct', newProduct)
})
app.on('ready', () => {
    createWindow()
    
})



