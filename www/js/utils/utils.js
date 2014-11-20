define([
  'jquery'
], function($){

  var utils = {
    /*
    * FUNCTIONS
    */

    ////get Piece/////
    //  get the piece (object) from the id and return it...
    ////////////////
    getPiece: function(which){
      return this.model.get('pieceArr')[parseInt(which.substr((which.search(/\_/)+1),1))][parseInt(which.substring((which.search(/\|/)+1),which.length))];
    },

    ////get Transform/////
    //  look at the id of the piece sent in and work on it's transform
    ////////////////
    getTransform: function(which){
      var hold=document.getElementById(which).getAttributeNS(null,'transform');
      var retVal=new Array();
      retVal[0]=hold.substring((hold.search(/\(/) + 1),hold.search(/,/));     //x value
      retVal[1]=hold.substring((hold.search(/,/) + 1),hold.search(/\)/));;    //y value
      return retVal;
    },

    ////set Transform/////
    //  look at the id, x, y of the piece sent in and set it's translate
    ////////////////
    setTransform: function(which,x,y){
      document.getElementById(which).setAttributeNS(null,'transform','translate('+x+','+y+')');
    }

  };
  return utils;
});
