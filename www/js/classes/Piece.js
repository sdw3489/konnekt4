define([
  'jquery',
  'events/channel'
], function($, EventsChannel){

  //////////////////////////////////////////////////////
  // Class: Piece                   //
  // Description: Using the javascript prototype, you //
  // can make faux classes. This allows objects to be //
  // made which act like classes and can be referenced//
  // by the game.                   //
  //////////////////////////////////////////////////////


  // Piece constructor
  // creates and initializes each Piece object
  var Piece = function(board,player,cellRow,cellCol,num, GameView){
    this.model = GameView.model.attributes;
    this.board = board;     // piece needs to know the svg board object so that it can be attached to it.
    this.player = player;   // piece needs to know what player it belongs to.
    // this.type = type;     // piece needs to know what type of piece it is. (put in so it could be something besides a checker!)
    this.current_cell = this.model.boardArr[cellRow][cellCol]; // piece needs to know what its current cell/location is.
    this.number = num;      // piece needs to know what number piece it is.
    //this.isCaptured = false;  // a boolean to know whether the piece has been captured yet or not.
    this.cellRow = cellRow;
    this.cellCol = cellCol;
    //NEW
    this.checkerRow = 0;
    this.checkerCol = 0;
    this.connections = 0;
    //id looks like 'piece_0|3' - for player 0, the third piece
    this.id = "piece_" + this.player + "|" + this.number;   // the piece also needs to know what it's id is.
    this.current_cell.isOccupied(this.id);            //set THIS board cell to occupied
    this.x=this.current_cell.getCenterX();            // the piece needs to know what its x location value is.
    this.y=this.current_cell.getCenterY();            // the piece needs to know what its y location value is as well.

    var svgns = "http://www.w3.org/2000/svg";
    this.piece =  document.createElementNS(svgns,"g");        // a shortcut to the actual svg piece object

    this.piece.setAttributeNS(null,"transform","translate("+this.x+","+this.y+")");

    // create the svg 'checker' piece.
    var circ = document.createElementNS(svgns,"circle");
    circ.setAttributeNS(null,"r",'30');
    circ.setAttributeNS(null,"class",'player' + this.player);          // change the color according to player
    this.piece.appendChild(circ);                       // add the svg 'checker' to svg group
    //create more circles to prove I'm moving the group (and to make it purty)
    var circ2 = document.createElementNS(svgns,"circle");
    circ2.setAttributeNS(null,"r",'25');
    circ2.setAttributeNS(null,"fill",'white');
    circ2.setAttributeNS(null,"opacity",'0.1');
    this.piece.appendChild(circ2);


    this.setAtt("id",this.id); // make sure the SVG object has the correct id value
    document.getElementsByTagName('svg')[0].appendChild(this.piece);

    this.model.boardArr[cellRow][cellCol].occupied = Array(player,cellRow, cellCol);

    this.runCheck();
    return this; //was commented out, need to keep an eye out
  }


  Piece.prototype = {

    runCheck : function(){
      var winner, loser;
      for (var i = this.model.directionArr.length-1; i >= 0; i--) {
        for (var k = 0; k <= this.model.directionArr[i].direction.length-1; k++) {
          if(this.countDirection(this.model.directionArr[i].direction[k])){
            $.each(this.model.players, $.proxy(function(i, player){
              if(player.playerId == this.player){
                winner = player;
              }else{
                loser = player;
              }
            },this));
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
          if(this.model.numPieces == 42){
            this.connections = 4;
          }
          break;
        default:
          break;
      }
    },

    // function that allows a quick setting of an attribute of the specific piece object
    setAtt: function(att,val) {
      this.piece.setAttributeNS(null,att,val);
    }
  }



  return Piece;

});