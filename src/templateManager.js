//
//Script to hold all the template related functions
//
const templateList = fs.readdirSync('./assets/templates/');

function templateManager(){
  //
  console.log('templateManager setted');
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
  var wv = document.createElement('iframe');
  //wv.src = "file://"+ __dirname + '/../assets/templates/' + this.getTemplate();
  wv.src = "file://" + this.getTemplatePath();
  wv.height = '100%';
  wv.width = '100%';
  //wv.autosize = true;
  wv.id = 'workspace-canvas';
  console.log(wv.src);
  document.getElementById('workspace').appendChild(wv);

}

templateManager.prototype.write = function(selector , content){
  //Access iframe and link to UIManager

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
