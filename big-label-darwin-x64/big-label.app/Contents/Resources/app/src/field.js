//field



var field = function(id, label, type, target,facultative = false  , values = ''){
  this.id = id;
  this.label = label;
  this.type = type;
  this.target = target;
  this.values = values;
  this.facultative = facultative;
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
  console.log(this.facultative);
  switch(this.type){
    case 'title':

      i.type = "text";
      i.label = this.label;
      i.class = this.id + " " + this.type;
      i.setAttribute('target', this.target);
      l.innerText = this.label;
      var b = document.createElement('span');
      b.setAttribute('class', 'bar');
      form.appendChild(b);
      //
      var h = document.createElement('span');
      h.setAttribute('class', 'highlight');
      form.appendChild(h);

      form.appendChild(i);
      this.attach(i,this.target);

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

      var i1 = document.createElement('input');
      i.type = "file";
      i.accept = "image/*";
      i.name = this.id;
      i.class = this.id + " " + this.type;
      l.innerText = this.label;

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


  }else{

  }
  if(this.facultative == true){
    var fac = document.createElement('input');
    fac.setAttribute('type', 'checkbox');
    fac.setAttribute('class', 'visibility');
    form.appendChild(fac);
    this.attach(fac,this.target);
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
      case 'checkbox':
        $(input).change(function(){

          console.log("UIM::hide: "+ $(this).parent().attr('id'));
          //console.log("UIM::hide: "+ $(this).attr('class'));
          template.togglevis($(this).parent().attr('id'));
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



module.exports = field;
