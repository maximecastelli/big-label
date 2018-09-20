
// inyector.js// Get the ipcRenderer of electron
const {ipcRenderer} = require('electron');
//window.$ = window.jQuery = require('jquery');

// Do something according to a request of your mainview
ipcRenderer.on('request', function(){
    console.log('requested');
    ipcRenderer.sendToHost(getScripts());
});

ipcRenderer.on("alert-something",function(event,data){
    alert(data);
});

ipcRenderer.on("edit",function(event,data){

    var f = document.getElementsByName(data.id)[0];

    console.log('injector::'+data.id);
    f.querySelector('.edit').innerHTML = data.text;
    //console.log(document.body.getElementsByClassName('edit').length);

});

ipcRenderer.on("setimg",function(event,data){
    // the document references to the document of the <webview>
    //document.getElementById(data.id).innerHTML = data.text;
    console.log("INJECTOR::Setting " + data.img + " in " + data.id);
    var f = document.getElementsByName(data.id)[0];
    //var f = document.getElementByClassName('edit').length;
    //f.innerHTML = data.text;
    console.log(data.img);
    console.log(f.querySelector('.edit'));
    f.querySelector('.edit').setAttribute('src',data.img);
    //console.log(document.body.getElementsByClassName('edit').length);

});

ipcRenderer.on("setcover",function(event,data){


    switch (data.type) {
      case 'color':
        console.log(data.val);
        var f = document.getElementsByClassName('color-layer')[0];
        f.setAttribute('data-value',data.val);
        break;
      case 'image':
        console.log(data.val);
        var f = document.getElementsByClassName('cover-img')[0];
        var v = require("path").join(__dirname, '../content/image', data.val);
        console.log(v);
        f.querySelector('.edit').setAttribute('src',v);
        break;
      default:

    }

});

ipcRenderer.on('togglevis', function(event,data){
  var f = document.getElementsByName(data.id)[0];
  if (f.classList.contains('hidden')) {
    f.classList.remove('hidden');
  }else{
    f.classList.add('hidden');
  }
});

ipcRenderer.on('printHTML', function(event){
  data = document.documentElement.innerHTML;
  console.log(data);
});
/**
 * Simple function to return the source path of all the scripts in the document
 * of the <webview>
 *
 *@returns {String}
 **/

function getScripts(){
    var items = [];

    for(var i = 0;i < document.scripts.length;i++){
        items.push(document.scripts[i].src);
    }

    return JSON.stringify(items);
}
