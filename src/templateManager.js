//
//Script to hold all the template related functions
//
const templateList = fs.readdirSync('./assets/templates/');


function templateManager(){
  //
  console.log('templateManager setted');
  this.wv = document.createElement('webview');
}

templateManager.prototype.setTemplateList = function(){
  var index = 0;
  var list = document.getElementsByName('templates');
  console.log(list);
  for(element in templateList)
  {
     var opt = document.createElement("option");
     opt.value= index;
     console.log(templateList[index]);
     opt.innerHTML = templateList[index]; // whatever property it has

     // then append it to the select element
     document.getElementById('templates').appendChild(opt);
     console.log('Added '+ templateList[index] +' to list' );
     index++;
  }

}

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

//UTILS
templateManager.prototype.getTemplateList = function(){
  return templateList;
}
templateManager.prototype.getTemplate = function(){
  var tmp = document.getElementById('templates');
  var n = tmp.options[tmp.selectedIndex].innerHTML;
  return n;
}
templateManager.prototype.getTemplatePath = function(){
  //var tmp = document.getElementById('templates');
  var path = __dirname + '/../assets/templates/' + this.getTemplate();
  return path;
}


module.exports = templateManager;
