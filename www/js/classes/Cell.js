define([
  'jquery',
  'utils/utils'
], function($, utils){

  /***********************************************
   * Class: Cell
   * Description:  This will create a cell object
   * (board square) that you can reference from the game
   * Arguments:
   *    size - tell the object it's width & height
   **************************************************/


  // Cell constructor
  var Cell = function(myParent,id,size,col,row, GameView) {
    this.parent = myParent;
    this.id = id;
    this.size = size;
    this.col = col;
    this.row = row;
    //initialize the other instance vars
    this.occupied = null;
    this.x = this.col * this.size;
    this.y = this.row * this.size;
    this.centerx=this.getCenterX();           // the piece needs to know what its x location value is.
    this.centery=this.getCenterY();         // the piece needs to know what its y location value is as well.

    //create the cell svg object
    this.object = this.createIt();

    //******* Moving to Game View *********/
    this.object.onclick = function() {
      GameView.placePiece(col);
    }
    this.parent.appendChild(this.object);
  }

  Cell.prototype = {

    //create it
    createIt: function() {
      // create the svg cell item.
      var g = utils.createSVG('g');

      var rect = utils.createSVG('rect', {
        'id': this.id,
        'width': this.size+'px',
        'height': this.size+'px',
        'x': this.x+'px',
        'y': this.y+'px',
        'class': 'cell'
      });
      g.appendChild(rect);

      var circ = utils.createSVG('circle', {
        'transform' : "translate("+(this.x+(this.size/2))+","+(this.y+(this.size/2))+")",
        'r' : '30',
        'x' : this.x+'px',
        'y' : this.y+'px',
        'fill' : 'white'
      });

      g.appendChild(circ);

      // return this object to be stored in a variable
      return g;
    },

    //get my center x
    getCenterX: function(){
      return (this.x + (this.size/2));
    },

    //get my center y
    getCenterY: function(){
      return (this.y + (this.size/2));
    }

  }

  return Cell;

});