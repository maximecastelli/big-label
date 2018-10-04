const {app, BrowserWindow, Menu} = require('electron')

const electron = require('electron')


//const app = electron.app
//const bw = electron.BrowserWindow

const os = require('os')
const ipc = electron.ipcMain
const shell = electron.shell
const fs = require('fs');

const path = require('path')
const url = require('url')


  // Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
  // fermee automatiquement quand l'objet JavaScript sera garbage collected.
  let win

  function createWindow () {
    // Créer le browser window.
    win = new BrowserWindow({width: 1440, height: 1024})

    // et charge le index.html de l'application.
    win.loadFile('index.html')

    // Ouvre les DevTools.
    win.webContents.openDevTools()

    // Émit lorsque la fenêtre est fermée.
    win.on('closed', () => {
      // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
      // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
      // où vous devez supprimer l'élément correspondant.
      win = null
    })

    // Create the Application's main menu
    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  }

  // Cette méthode sera appelée quant Electron aura fini
  // de s'initialiser et sera prêt à créer des fenêtres de navigation.
  // Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
  app.on('ready', createWindow)

  // Quitte l'application quand toutes les fenêtres sont fermées.
  app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (win === null) {
      createWindow()
    }
  })


//Export




ipc.on('gpu', (_, gpu) => {
  console.log(gpu)
})
