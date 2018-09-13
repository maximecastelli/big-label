// inyector.js// Get the ipcRenderer of electron
const {ipcRenderer} = require('electron');

// Do something according to a request of your mainview
ipcRenderer.on('request', function(){
    ipcRenderer.sendToHost(getScripts());
});

ipcRenderer.on("alert-something",function(event,data){
    alert(data);
});

ipcRenderer.on("edit",function(event,data){
    // the document references to the document of the <webview>
    //document.getElementById(data.id).innerHTML = data.text;
    //alert("writing " + data.text + " in " + data.id);
    var f = document.getElementsByName(data.id)[0];
    //var f = document.getElementByClassName('edit').length;
    //f.innerHTML = data.text;
    console.log(data.id);
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
