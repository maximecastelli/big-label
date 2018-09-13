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
var template;
var wv;

function UIManager(tmp){
  template = tmp;
  wv = tmp.wv;
  this.scan;
  console.log('Create UI');
  console.log(wv);
  this.recto;
  this.verso;
  this.interface = document.createElement('div');
  this.interface.id = "interface";


}

UIManager.prototype.scanTemplate = function(){
  var path = tmp.getTemplatePath();
  var scan;
  console.log(path);
  fs.readFile(path, {encoding: 'utf-8'}, function(err,data){
      if (!err) {
          this.scan = document.createElement('html');
          $(this.scan).append(data).html();
          //console.log(tmp);
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

  var t = document.createElement('h3');
  var cb = document.createElement('input');
  var d = document.createElement('div');
  d.setAttribute('class', 'section-title '+ this.name);


  cb.setAttribute('type', 'checkbox');
  cb.setAttribute('class', 'section-toggle');

  t.innerHTML = this.name;

  d.appendChild(t);
  d.appendChild(cb);
  this.display.appendChild(d);

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
    //console.log(t);
    out[i] = new field(f[i].getAttribute('name') , f[i].getAttribute('name') , f[i].getAttribute('type'), 'edit' );
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
  console.log(
    'Creating new field:\n'+
    'id => ' + id + '\n' +
    'label => ' + label + '\n' +
    'type => ' + type + '\n' +
    'target => ' + target + '\n'
  );

}



field.prototype.make = function(){
  var form = document.createElement('form');
  var l = document.createElement('label');
  var i = document.createElement('input');
  l.name = this.id;
  form.id = this.id;
  i.required = true;

  switch(this.type){
    case 'title':
      //console.log("TITLE field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
      i.type = "text";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;

    break;
    case 'long':
      i.type = "textfield";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      //l.appendChild(i);
      //console.log("LONG field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    case 'string':
      i.type = "text";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      //l.appendChild(i);
      //console.log("STRING field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    case 'img':
      /*
      <input type="file" name="pic" accept="image/*">
      <input type="submit">
      */
      var i1 = document.createElement('input');
      i.type = "file";
      i.accept = "image/*";
      i.name = this.id;
      i.class = this.id + " " + this.type;
      l.innerText = this.label;
      //.appendChild(i1);
      //i.type = "submit";
      i.setAttribute('target', this.target);
      //l.appendChild(i);
      //console.log("IMG field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    case 'fig':
      var i = document.createElement('input');
      i.type = "number";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      //l.appendChild(i);
      //console.log("FIG field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    case 'picker':
      var i = document.createElement('input');
      i.type = "text";
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      //l.appendChild(i);
      //console.log("PICKER field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    default:
      //console.log("field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
  }
  form.appendChild(i);
  this.attach(i,this.target);


  var b = document.createElement('span');
  b.setAttribute('class', 'bar');
  form.appendChild(b);
  //
  var h = document.createElement('span');
  h.setAttribute('class', 'highlight');
  form.appendChild(h);

  form.appendChild(l);

  return form;
  //this.interface.appendChild(i);
}


field.prototype.attach = function(input, target){

  if($(input).attr('type') != 'file'){

    $(input).keyup(function(){
      var t = $(this).val();
      console.log("UIM::text: "+ $(this).parent().attr('id') + '.' + target);
      //$(target).html( $(this).val());
      template.write($(this).parent().attr('id'), $(this).val());
    });
  }else{

    $(input).change(function(){
      //if($(this).get(0) === 0){
      //console.log("UIM::img: "+ $(this).parent().attr('id') + '.' + target);
      console.log("UIM::img: "+ $(this));
      console.log($(this));
      //$(this)[0].reset();
      if(this.files[0] !== undefined)template.setimg($(this).parent().attr('id'),this.files[0].path);
      else template.setimg($(this).parent().attr('id'),"")
      //$(this).reset();


    });

  }

}

UIManager.prototype.setTemplate = function(tmp){
  template = tmp;
  wv = tmp.wv;
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
