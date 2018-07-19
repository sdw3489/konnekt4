define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel',
  'utils/utils',
], function($, _, Backbone, EventsChannel, utils ){

  /******************
   * Class: Piece
   * Description: Using the javascript prototype, you  can make faux classes.
   *   This allows objects to be made which act like classes and can be referenced by the game.
   ******************/


  // Piece constructor
  // creates and initializes each Piece object
  var Piece = Backbone.View.extend({

     el: function(){
      this.current_cell = this.attributes.GameView.model.attributes.boardArr[this.attributes.cellRow][this.attributes.cellCol]; // piece needs to know what its current cell/location is.
      this.x=this.current_cell.getCenterX(); // the piece needs to know what its x location value is.
      this.y=this.current_cell.getCenterY(); // the piece needs to know what its y location value is as well.
      return utils.createSVG('g', {
        'id' : "piece_" + this.attributes.player + "|" + this.attributes.num,
        "transform" : "translate("+this.x+","+this.y+")"
      });
    },
    events:{},

    initialize: function(){
      this.model = this.attributes.GameView.model.attributes;
      this.board = this.attributes.board; // piece needs to know the svg board object so that it can be attached to it.
      this.player = this.attributes.player; // piece needs to know what player it belongs to.
      this.number = this.attributes.num; // piece needs to know what number piece it is.
      this.cellRow = this.attributes.cellRow;
      this.cellCol = this.attributes.cellCol;
      //NEW
      this.checkerRow = 0;
      this.checkerCol = 0;
      this.connections = 0;

      this.id = "piece_" + this.player + "|" + this.number; //id looks like 'piece_0|3' - for player 0, the third piece

      this.render();

      this.model.boardArr[this.cellRow][this.cellCol].occupied = Array(this.player,this.cellRow, this.cellCol);

      this.runCheck();
    },

    render: function(){
      // create the svg piece.
      var circ = utils.createSVG('circle',{
        'r' : '30',
        'class' : 'player' + this.player // change the color according to player
      });

      this.$el.append(circ);

      var innerCirc = utils.createSVG('circle',{
        "r" : "25",
        "fill" : "white",
        "opacity" : "0.1"
      });
      this.$el.append(innerCirc);

      return this;
    },

    runCheck : function() {
      var winner = null, loser = null;
      for (var i = this.model.directionArr.length-1; i >= 0; i--) {
        for (var k = 0; k <= this.model.directionArr[i].direction.length-1; k++) {
          if(this.countDirection(this.model.directionArr[i].direction[k])){

            //dont set winner or loser if TIE returns true
            if(this.model.directionArr[i].end_type != 'tie'){
              $.each(this.model.players, $.proxy(function(i, player){
                if(player.playerId == this.player){
                  winner = player;
                }else{
                  loser = player;
                }
              },this));
            }
            EventsChannel.trigger('game:end', {
              'display_msg' : this.model.directionArr[i].message,
              'end_type'    : this.model.directionArr[i].end_type,
              'winner'      : winner,
              'loser'       : loser
            });
            return;
          }
        }
        this.connections=0;
      }
    },

    countDirection: function(direction){
      checkerRow = this.cellRow;
      checkerCol = this.cellCol;
      this.checkDirection(direction);

      if(this.connections >= 3){
        return true;
      } else{
        return false;
      }
    },

    countConnections: function(direction){
      var checkedCell = this.model.boardArr[checkerRow][checkerCol];
      if(checkedCell.occupied != null){
        var checkedCellArr = checkedCell.occupied;
        if(checkedCellArr[0] == this.player){
          this.connections++;
          this.checkDirection(direction);
        }
      }
    },

    checkDirection: function(direction){
      switch(direction) {
        case 'below':
          if(checkerRow >= this.model.BOARDHEIGHT-1) return;
          checkerRow++;
          if (typeof this.model.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'right':
          if(checkerCol >= this.model.BOARDWIDTH-1) return;
          checkerCol++;
          if (typeof this.model.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'left':
          if(checkerCol === 0) return;
          checkerCol--;
          if (typeof this.model.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'aboveRight':
          if(checkerCol >= this.model.BOARDWIDTH-1 || checkerRow === 0) return;
          checkerRow--;
          checkerCol++;
          if (typeof this.model.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'aboveLeft':
          if(checkerCol === 0 || checkerRow === 0) return;
          checkerRow--;
          checkerCol--;
          if (typeof this.model.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'belowRight':
          if(checkerRow >= this.model.BOARDHEIGHT-1 || checkerCol >= this.model.BOARDWIDTH-1) return;
          checkerRow++;
          checkerCol++;
          if (typeof this.model.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'belowLeft':
          if(checkerRow >= this.model.BOARDHEIGHT-1 || checkerCol === 0) return;
          checkerRow++;
          checkerCol--;
          if (typeof this.model.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'full':
          if(this.model.numPieces == (this.model.BOARDHEIGHT * this.model.BOARDWIDTH)){
            this.connections = 4;
          }
          break;
        default:
          break;
      }
    }

  });

  return Piece;

});