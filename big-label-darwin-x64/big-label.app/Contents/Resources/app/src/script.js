window.$ = window.jQuery = require('jquery');



var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
const os = require('os')
const ipc = app.ipcMain
const shell = app.shell

const path = require('path')
const url = require('url')



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

ipc.on('print', function(event){

  const pdfpath = path.join(os.tmpdir(), 'print.pdf');
  const htmlpath = path.join(os.tmpdir(), 'test.html');
  //var win = document.getElementById('workspace-canvas');
  //console.log(win);
  //tmp.wv.request();
  var win = tmp.wv;
  //tmp.printHTML();
  /*
  win.getWebContents().savePage(htmlpath, 'HTMLComplete', (error) => {
      if (!error) console.log('Page sauvegardée correctement');
      shell.openExternal('file://'+ htmlpath);
  });
  */
  win.getWebContents().printToPDF({
    marginsType: 1,
    printBackground: true,
    printSelectionOnly: false,
    landscape: true,
    pageSize: {height:280000, width:76000}
  }, function(error , data){
  //document.getElementById('#workspace').find('iframe').webContents.printToPDF({}, function(error , data){
    if(error)return console.log(error.message);
    console.log(win);
    fs.writeFile(pdfpath, data, (err) => {
      if (err) console.log(err);
      //alert("votre fichier à été correctement enregistré");
      shell.openExternal('file://'+ pdfpath);
      event.sender.send('wrote', pdfpath);
    });
  });

});

//Export file


/*
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
    });

  });
};
*/

$( function() {
  $( document ).on( "change", ":checkbox", function () {
    //$('.section-toggle:checkbox').prop('checked',false);

    if($(this).hasClass('section-toggle')){
      if($(this).is(':checked')){
          //console.log('penis');
          $('.section-toggle').not(this).prop('checked',false);

      } else {
          console.log('TOGGLE3');
      }
      $('section').removeClass('active');
      $('.section-toggle:checked').closest('section').addClass('active');
    }
    if($(this).hasClass('page-toggle')){
      if($(this).is(':checked')){
          //console.log('penis');
          $('.page-toggle').not(this).prop('checked',false);

      } else {
          //console.log('TOGGLE3');
      }
      $('page').removeClass('active');
      $('.page-toggle:checked').closest('page').addClass('active');
    }


  });
});


/*
$('.section-toggle').change(function(){
  console.log('penis');
    if($(this).is(':checked')){
        $('.section-toggle').not(this).prop('checked',false);
    } else {
        console.log('TOGGLE3');
    }
});
*/


function logContentFolder(){
  var imgPath = require("path").join(__dirname, '/content/image');

  var setOption = require("fs").readdirSync(imgPath).forEach(function(file) {
    //console.log('content/images/'+ file);
    var o = document.createElement('option');
    o.setAttribute('type', 'image');
    o.innerHTML = imgPath + file;
    console.log('o:'+o.outerHTML);
    //require( cfconst +'/'+ file);
  });
}