//onsole.log('Radiobox called');

function radiobox(type, val){

  console.log('Creating Radio box');
  this.active = false;
  this.type = type;
  this.value = val;
  this.body = document.createElement('div');
  this.input = document.createElement('input');
  this.checkmark = document.createElement('span');

  this.body.setAttribute('class', 'option-holder');
  this.checkmark.setAttribute('class', 'checkmark');

  this.input.setAttribute('name',this.type  +'-option');
  this.input.setAttribute('class',this.type +'-option');
  this.input.setAttribute('type','radio');
  this.body.setAttribute('data-value',this.value.innerHTML);

  this.body.setAttribute('data-type', this.value.getAttribute('type'));
  if( this.value.getAttribute('type') == 'image') this.body.setAttribute('data-thumb', this.setThumb(this.value.innerHTML));
  this.body.style.backgroundImage = 'url("'+this.body.getAttribute('data-thumb')+ '")';
  this.body.appendChild(this.input);
  this.body.appendChild(this.checkmark);

}

radiobox.prototype.setAttribute = function(attr, val){
  this.body.setAttribute(attr,val);
}

radiobox.prototype.make = function(){
  return this.body;
}


radiobox.prototype.setThumb = function(val){
  //var out = val.substr(0, val.lastIndexOf('.'))+"-thumb.png";
  return 'content/image/thumbs/'+val.substr(0, val.lastIndexOf('.'))+".jpg";
}




module.exports = radiobox;
/*
lab.setAttribute('class', 'option-holder');
cm.setAttribute('class', 'checkmark');

el.setAttribute('name',this.id+'-option');
el.setAttribute('class',this.id+'-option');
el.setAttribute('type','radio');
lab.setAttribute('data-value',v[j].innerHTML);
lab.setAttribute('data-type',v[j].getAttribute('type'));

lab.appendChild(el);
lab.appendChild(cm);
form.appendChild(lab);
*/
