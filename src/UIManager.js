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

// Initialize Custom fields

const fs = require('fs');
const cfconst = './ui/customfields';
/*
var cfPath = require("path").join(__dirname, '/ui/customfields');

var customfield = require("fs").readdirSync(cfPath).forEach(function(file) {
  console.log(cfconst +'/'+ file);
  require( cfconst +'/'+ file);
});
*/
var radio = require( cfconst +'/'+ 'radiobox.js');

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
          this.verso.create(this.interface);
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
  var cb = document.createElement('input');
  var d = document.createElement('div');
  var t = document.createElement('h2');
  d.setAttribute('class', 'page-title '+ this.name);
  cb.setAttribute('type', 'checkbox');
  cb.setAttribute('class', 'page-toggle');
  t.innerHTML = this.name;
  d.appendChild(t);
  d.appendChild(cb);


  this.content = document.createElement('page');
  this.content.setAttribute('class', this.name);
  this.content.appendChild(d);

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

  var inputs = d.getElementsByTagName('div');
  var out = [];
  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].hasAttribute('type')) {
          out.push(inputs[i]);
      }
  }

  //return d.getElementsByTagName('div');
  return out;
}

section.prototype.setFields = function(){
  var f = this.getFields();
  var out = [];
  for(var i=0;i<f.length;i++){

    var sel ='#'+f[i].getAttribute('values');
    console.log($(f[i]));
    if(f[i].hasAttribute('values'))console.log($(f[i]).find(sel));
    if(f[i].hasAttribute('values')) out[i] = new field(f[i].getAttribute('name') ,f[i].getAttribute('name') ,f[i].getAttribute('type'),'edit',$(f[i]).find(sel).children());
    else out[i] = new field(f[i].getAttribute('name'),f[i].getAttribute('name'),f[i].getAttribute('type'),'edit');

    this.display.appendChild(out[i].make());
  }
  return out;
}

section.prototype.create = function(loc){

  loc.appendChild(this.display);
}




var field = function(id, label, type, target, values = ''){
  this.id = id;
  this.label = label;
  this.type = type;
  this.target = target;
  this.values = values;
  console.log(
    'Creating new field:\n'+
    'id => ' + id + '\n' +
    'label => ' + label + '\n' +
    'type => ' + type + '\n' +
    'target => ' + target + '\n',
    'values =>' + values
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
      var fset = document.createElement('fieldset');
      fset.setAttribute('target', this.target);
      var v = this.values;
      console.log(v);
      for(var j=0; j<v.length; j++){

        var rb = new radio( this.id , v[j]);
        console.log('switch::attach');
        this.attach(rb.input, this.target);
        form.appendChild(rb.make());


      }
      //i.class = this.id + " " + this.type;
      //i.setAttribute('target', this.target);
      //lab.innerText = this.label;

      //console.log("PICKER field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
    default:
      //console.log("field: "+this.id+"\n label: "+this.label+"\n type: "+this.type);
    break;
  }
  if(this.type != 'picker'){

    var b = document.createElement('span');
    b.setAttribute('class', 'bar');
    form.appendChild(b);
    //
    var h = document.createElement('span');
    h.setAttribute('class', 'highlight');
    form.appendChild(h);

    form.appendChild(i);
    this.attach(i,this.target);
  }else{

  }

  form.appendChild(l);

  return form;
  //this.interface.appendChild(i);
}


field.prototype.attach = function(input, target){
  switch ($(input).attr('type')) {
    case 'file':
      $(input).change(function(){

        console.log("UIM::img: "+ $(this));
        console.log($(this));
        if(this.files[0] !== undefined)template.setimg($(this).parent().attr('id'),this.files[0].path);
        else template.setimg($(this).parent().attr('id'),"")
      });
      break;
    case 'radio':
      $(input).change(function(){

        console.log("UIM::cover: "+  $(this).parent().attr('data-value').innerHTML);
        console.log($(this));
        template.setcover($(this).parent().parent().attr('id'), $(this).parent().attr('data-value'), $(this).parent().attr('data-type'));
      });
      break;
    default:
      $(input).keyup(function(){
        var t = $(this).val();
        console.log("UIM::text: "+ $(this).parent().attr('id') + '.' + target);
        //$(target).html( $(this).val());
        template.write($(this).parent().attr('id'), $(this).val());
      });

  }
  /*
  if($(input).attr('type') != 'file'){

    $(input).keyup(function(){
      var t = $(this).val();
      console.log("UIM::text: "+ $(this).parent().attr('id') + '.' + target);
      //$(target).html( $(this).val());
      template.write($(this).parent().attr('id'), $(this).val());
    });
  }else{

    $(input).change(function(){

      console.log("UIM::img: "+ $(this));
      console.log($(this));
      if(this.files[0] !== undefined)template.setimg($(this).parent().attr('id'),this.files[0].path);
      else template.setimg($(this).parent().attr('id'),"")
    });

  }*/

}

field.prototype.setThumb = function(el){
  console.log(el.getAttribute('data-type'));
  switch(el.getAttribute('data-type')){
    case 'color':
      $(el).css({'background-color' : $(el).attr('data-value')});
    break;
    case 'image':
      var pth = el.getAttribute('data-value').split('.');
      pth = pth[0] + '-thumb.' + pth[1];
      var img = document.createElement('img');
      img.src = pth;
      console.log(img);

    break;
    default:
    break;
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
