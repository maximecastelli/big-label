var path = require('path'), fs=require('fs');

function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
        };
    };
};

fromDir('../LiteScript','.html');

for(element in templateList)
{
  if(element.isDirectory())
   var opt = document.createElement("option");
   opt.value= index;
   console.log(templateList[index]);
   opt.innerHTML = templateList[index]; // whatever property it has

   // then append it to the select element
   document.getElementById('templates').appendChild(opt);
   console.log('Added '+ templateList[index] +' to list' );
   index++;
}
