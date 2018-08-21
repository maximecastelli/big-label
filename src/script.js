console.log("LOADED");

const fontManager = require('font-manager');
var fonts = fontManager.getAvailableFontsSync();
console.log(fonts);
