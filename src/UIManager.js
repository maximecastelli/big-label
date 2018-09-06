/*
---
This file is the Interface Manager,
It scans the template and sets up the forms regarding the fields types
FIELD PARAM :
  - id
  - label
  - type

FIELD TYPES :
  - Title
  - Long text
  - Short text
  - Image
  - Figure
  - Color picker (list selector)

---
*/

// First setup
const iframeHolder = $("#workspace");

function UIManager(tmp){
  this.template = tmp;
  this.scan;
  console.log('Create UI');

  this.recto;
  this.verso;
  this.interface = document.createElement('div');
  this.interface.id = "interface";


}

UIManager.prototype.scanTemplate = function(){
  var path = tmp.getTemplatePath();
  var scan;
  fs.readFile(path, {encoding: 'utf-8'}, function(err,data){
      if (!err) {
          this.scan = document.createElement('html');
          $(this.scan).append(data).html();
          console.log(tmp);
          this.recto = new face('recto', $(this.scan).find('.recto'));
          this.verso = new face('verso', $(this.scan).find('.verso'));
          this.recto.create(this.interface);
      } else {
          console.log(err);
      }
  });

}

UIManager.prototype.create = function(loc){
  //
  loc.append(this.interface);
}

UIManager.prototype.link = function(template){
  //Link to templateManager
  this.template = template;

}

var face = function(name, data, target){
  this.name = name;
  this.data = data;

  this.content = document.createElement('page');
  this.nbSections = data[0].getElementsByTagName('section').length;
  this.sections = this.setSections();

}

face.prototype.getSections = function(){
  return this.data[0].getElementsByTagName('section');
}

face.prototype.setSections = function(){
  var s = this.getSections();
  var out = [];
  for(var i=0;i<s.length;i++){
    //console.log(s[i].getAttribute('name'));
    out[i] = new section(s[i].getAttribute('name'),s[i].innerHTML);
    out[i].create(this.content);
  }
  return out;
}

face.prototype.create = function(loc){
  loc.appendChild(this.content);
}

var section = function(name, data, target){
  this.name = name;
  this.data = data;

  this.display = document.createElement('section');
  this.fields = this.setFields();

}

section.prototype.getFields = function(){
  //console.log(this.data);
  var d = document.createElement('section');
  d.innerHTML = this.data;
  return d.getElementsByTagName('div');
}

section.prototype.setFields = function(){
  var f = this.getFields();
  var out = [];
  for(var i=0;i<f.length;i++){
    //console.log(f[i].getAttribute('name'));
    //console.log(f[i]);
    //console.log($(f[i]).find(':header')[0]);
    var t = iframeHolder.find('iframe').contents().find('div[name='+$(f[i]).attr('name')+']');//.find(f[i].name).find('.edit')[0];
    console.log(t);
    out[i] = new field(f[i].getAttribute('name') , $(f[i]).find(':header')[0].innerText , f[i].getAttribute('type'), $(t).find('.edit')[0] );
    this.display.appendChild(out[i].make());
  }
  return out;
}

section.prototype.create = function(loc){
  loc.appendChild(this.display);
}

var field = function(id, label, type, target){
  this.id = id;
  this.label = label;
  this.type = type;
  this.target = target;

}



field.prototype.make = function(){
  var form = document.createElement('form');
  var l = document.createElement('label');
  var i = document.createElement('input');
  l.name = this.id;
  switch(this.type){
    case 'title':
      console.log("TITLE field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
      i.type = "text";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      l.appendChild(i);
    break;
    case 'long':
      i.type = "textfield";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      l.appendChild(i);
      //console.log("LONG field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    case 'string':
      i.type = "text";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      l.appendChild(i);
      //console.log("STRING field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    case 'img':
      /*
      <input type="file" name="pic" accept="image/*">
      <input type="submit">
      */
      var i1 = document.createElement('input');
      i1.type = "file";
      i1.accept = "image/*";
      i1.name = this.id;
      i1.class = this.id + " " + this.type;
      l.innerText = this.label;
      l.appendChild(i1);
      i.type = "submit";
      i.setAttribute('target', this.target);
      l.appendChild(i2);
      //console.log("IMG field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    case 'fig':
      var i = document.createElement('input');
      i.type = "number";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      l.appendChild(i);
      console.log("FIG field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    case 'picker':
      var i = document.createElement('input');
      i.type = "text";
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      l.appendChild(i);
      console.log("PICKER field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    default:
      console.log("field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
  }
  this.attach(i,this.target);
  form.appendChild(l);
  return form;
  //this.interface.appendChild(i);
}


field.prototype.attach = function(input, target){

  $(input).keyup(function(){
    var t = $(this).val();
    console.log("writing "+ $(this).val() +" in "+ $(target).parent().attr('name'));

    console.log("target: "+target);

    $(target).html( $(this).val());

  });

}

field.prototype.setTemplate = function(tmp){
  this.template = tmp;
}

module.exports = UIManager;


/*
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'start.html');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    } else {
        console.log(err);
    }
});
*/
