define([
  'jquery',
  'models/gameBoard',
  'events/Channel'
], function($, gameBoard, EventsChannel ){

  //////////////////////////////////////////////////////
  // Class: Cell                    //
  // Description:  This will create a cell object   //
  // (board square) that you can reference from the   //
  // game.                      //
  // Arguments:                   //
  //    size - tell the object it's width & height  //
  //////////////////////////////////////////////////////


  // Cell constructor
  var Cell = function(myParent,id,size,col,row) {
    this.parent = myParent;
    this.id = id;
    this.size = size;
    this.col = col;
    this.row = row;
    //initialize the other instance vars
    this.occupied = null;
    this.state = 'alive';
    this.x = this.col * this.size;
    this.y = this.row * this.size;
    this.centerx=this.getCenterX();           // the piece needs to know what its x location value is.
    this.centery=this.getCenterY();         // the piece needs to know what its y location value is as well.
    this.color = 'white';
    //create it...
    this.object = this.createIt();

    //******* Moving to Game View *********/
    this.object.onclick = function() {
      EventsChannel.trigger('click:cell', col);
    }
    this.parent.appendChild(this.object);
    this.myBBox = this.getMyBBox();
  }

  Cell.prototype = {

    //////////////////////////////////////////////////////
    // Cell : Methods                 //
    // Description:  All of the methods for the     //
    // Cell Class (remember WHY we want these to be   //
    // seperate from the object constructor!)     //
    //////////////////////////////////////////////////////
    //create it...
    createIt: function() {
      var svgns = "http://www.w3.org/2000/svg";

      this.piece = document.createElementNS("http://www.w3.org/2000/svg","g");
      // create the svg 'checker' piece.
      var rect = document.createElementNS(svgns,'rect');
      rect.setAttributeNS(null,'id',this.id);
      rect.setAttributeNS(null,'width',this.size+'px');
      rect.setAttributeNS(null,'height',this.size+'px');
      rect.setAttributeNS(null,'x',this.x+'px');
      rect.setAttributeNS(null,'y',this.y+'px');
      rect.setAttributeNS(null,'class','cell_'+this.color);         // change the color according to player
      this.piece.appendChild(rect);                       // add the svg 'checker' to svg group
      //create more circles to prove I'm moving the group (and to make it purty)
      var circ = document.createElementNS(svgns,'circle');
      circ.setAttributeNS(null,"transform","translate("+(this.x+(this.size/2))+","+(this.y+(this.size/2))+")");
      circ.setAttributeNS(null,"r",'30');
      circ.setAttributeNS(null,'x',this.x+'px');
      circ.setAttributeNS(null,'y',this.y+'px');
      circ.setAttributeNS(null,"fill",'white');
      circ.setAttributeNS(null,"opacity",'1');
      this.piece.appendChild(circ);

      // return this object to be stored in a variable
      return this.piece;
    },
    //getCol
    getCol: function(){
      return this.col;
    },

    //get my BBox
    getMyBBox: function(){
      return this.object.getBBox();
    },

    //get my center x
    getCenterX: function(){
      return (this.x + (this.size/2));
    },

    //get my center y
    getCenterY: function(){
      return (this.y + (this.size/2));
    },

    //set me to occupied...
    isOccupied: function(pieceId){
      this.occupied = pieceId;
    },

    //set me to unoccupied...
    notOccupied: function(){
      this.occupied = null;
      //for testing purposes only!
      this.changeFill(this.color);
    },
    //to 'see' if the current cell is being 'filled' correctly with the new piece!
    changeFill: function(toWhat){
      document.getElementById(this.id).setAttributeNS(null,'class','cell_'+toWhat);
    }
  }

  return Cell;

});