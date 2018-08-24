var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

console.log("LOADED");

const fontManager = require('font-manager');
var fonts = fontManager.getAvailableFontsSync();
console.log('system fonts loaded…');

///
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
