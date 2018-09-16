//
//Script to hold all the template related functions
//
const templateList = fs.readdirSync('./assets/templates/');
var tmpPath = './assets/templates/';
var path = require('path');

function templateManager(){
  //
  console.log('templateManager setted');
  this.wv = document.createElement('webview');
}

templateManager.prototype.setTemplateList = function(){
  var index = 0;
  var list = document.getElementsByName('templates');
  console.log(list);
  this.getTemplateList(tmpPath, '.html');
  console.log();

}

templateManager.prototype.getTemplateList = function(startPath,filter){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var templates=fs.readdirSync(startPath);
    for(var i=0;i<templates.length;i++){
        //
        var filename=path.join(startPath,templates[i]);
        var stat = fs.lstatSync(filename);
        //
        if (stat.isDirectory()){
            //this.getTemplateList(filename,filter); //recurse
            console.log('-- found: ',filename);
            var opt = document.createElement("option");
            opt.value= i;
            opt.innerHTML = templates[i]; //dir fileName
            document.getElementById('templates').appendChild(opt);
            console.log('Added '+ templates[i] +' to list' );

            //filename.indexOf(filter)>=0
        }

    };
};




templateManager.prototype.loadTemplate = function (){

  //var webview = '<webview src="'+ getTemplatePath() +'" style="display:inline-flex; width:640px; height:480px"></webview>'
  //var wv = document.createElement('webview');

  //wv.src = "file://"+ __dirname + '/../assets/templates/' + this.getTemplate();
  this.wv.setAttribute('preload',"src/injector.js")
  this.wv.addEventListener("dom-ready", function() {

      console.log("DOM-Ready, triggering events !");
      //this.wv.send("request");
      //wv.send("alert-something", "Hey, i'm alerting this.");

  });

  // Process the data from the webview
  this.wv.addEventListener('ipc-message',function(event){
      console.log(event);
      console.info(event.channel);
  });
  this.wv.addEventListener('console-message', function(e) {
  	var srcFile = e.sourceId.replace(/^.*[\\\/]/, '');
  	console.log('webview logged from ' + srcFile +'(' + e.line + '): ' + e.message);
    //console.log(e.sourceID);
  });

  this.wv.src = "file://" + this.getTemplatePath();
  this.wv.height = '100%';
  this.wv.width = '100%';
  //wv.autosize = true;
  this.wv.id = 'workspace-canvas';
  console.log(this.wv.src);
  document.getElementById('workspace').appendChild(this.wv);

}

templateManager.prototype.write = function(selector , content){
  //Access iframe and link to UIManager
  console.log("TM::writing " + content + " in " + selector);
  //wv.send("alert-something", "TM::Hey, i'm alerting: "+ content);
  //wv.send('asynchronous-message', 'YO ' + content );
  console.log(this.wv);
  this.wv.send("edit",{
      id: selector,
      text: content
  });
}

templateManager.prototype.setimg = function(selector , img){
  //Access iframe and link to UIManager
  console.log("TM::setting " + img + " in " + selector);
  //wv.send("alert-something", "TM::Hey, i'm alerting: "+ content);
  //wv.send('asynchronous-message', 'YO ' + content );
  console.log(this.wv);
  this.wv.send("setimg",{
      id: selector,
      img: img
  });
}

templateManager.prototype.setcover = function(selector , val, type){
  //Access iframe and link to UIManager
  console.log("TM::setting " + val + " on cover ");
  //wv.send("alert-something", "TM::Hey, i'm alerting: "+ content);
  //wv.send('asynchronous-message', 'YO ' + content );
  console.log(this.wv);
  this.wv.send("setcover",{
      id: selector,
      val: val,
      type: type
  });
}

//UTILS

templateManager.prototype.getTemplate = function(){
  var tmp = document.getElementById('templates');
  var n = tmp.options[tmp.selectedIndex].innerHTML;
  var t= fs.readdirSync(path.join(tmpPath,n));
  for(var i=0;i<t.length;i++){
    console.log(t[i]);
    if(t[i].indexOf('.html')>=0)return n+ '/' +t[i];
  }
  console.log('getTemplate: ' + n);
  //return n;

}
templateManager.prototype.getTemplatePath = function(){
  //var tmp = document.getElementById('templates');
  var p = __dirname + '/../assets/templates/' + this.getTemplate();
  //var p = path.join(__dirname, '..', this.getTemplate());
  return p;
}


module.exports = templateManager;
