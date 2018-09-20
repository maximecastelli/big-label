const ipc = require('electron').ipcRenderer;
const printBtn = document.getElementById('print');

console.log('renderer loaded');

printBtn.addEventListener('click', function(event){
  ipc.send('print');
});

ipc.on('wrote', function(event, path){
  const message = `Wrote PDF to : ${path}`;
});
