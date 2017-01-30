define([
  'jquery'
], function($){

  var utils = {
    /*
    * FUNCTIONS
    */

    createSVG : function(type, attr){
      var el = document.createElementNS("http://www.w3.org/2000/svg",type);
      if(attr && attr != null){
        for (var key in attr) {
           if (attr.hasOwnProperty(key)) {
              var obj = attr[key];
              el.setAttributeNS(null,key, obj);
           }
        }
      }
      return el;
    }

  };
  return utils;
});
