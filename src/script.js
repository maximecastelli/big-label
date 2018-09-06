window.$ = window.jQuery = require('jquery');

var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
const os = require('os');
const ipc = app.ipcMain;
const shell = app.shell;

var tm = require('./src/templateManager');
var ui = require('./src/UIManager');


const fontManager = require('font-manager');

var fonts = fontManager.getAvailableFontsSync();
console.log('system fonts loaded…');


///
// SHow
var tmp = new tm();
tmp.setTemplateList();
//document.getElementById('workspace').src = tmp.getTemplatePath();
tmp.loadTemplate();
//
//SETUP UI
//
var gui = new ui(tmp);
gui.scanTemplate();
gui.create($('#ui'));

//console.log(ui.scanTemplate());

//Export file

document.getElementById('export').onclick = () =>{
  dialog.showSaveDialog((fileName) =>{
    if(fileName === undefined){
      alert("Nom de fichier non-défini");
      return;
    }

    var content = "Hello";

    fs.writeFile(fileName, content, (err) => {
      if (err) console.log(err);
      alert("votre fichier à été correctement enregistré");
    } )
  });
};
