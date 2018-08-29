/*
---
This file is the Interface Manager,
It scans the template and sets up the forms regarding the fields types

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
function UIManager(tmp){
  //this.fields = scanTemplate();
  console.log('Create UI');
}

UIManager.prototype.scanTemplate = function(){
  var path = tmp.getTemplatePath();
  console.log(path);
  var content;
  fs.readFile(path, function read(err, data) {
      if (err) {
          throw err;
      }
      content = data;
  });
  console.log(content);

}

module.exports = UIManager;
