define([
  'jquery',
  'models/gameBoard',
  'events/Channel'
], function($, gameBoard, EventChannel ){

  //////////////////////////////////////////////////////
  // Class: Piece                   //
  // Description: Using the javascript prototype, you //
  // can make faux classes. This allows objects to be //
  // made which act like classes and can be referenced//
  // by the game.                   //
  //////////////////////////////////////////////////////


  // Piece constructor
  // creates and initializes each Piece object
  var Piece = function(board,player,cellRow,cellCol,type,num){
    this.board = board;     // piece needs to know the svg board object so that it can be attached to it.
    this.player = player;   // piece needs to know what player it belongs to.
    this.type = type;     // piece needs to know what type of piece it is. (put in so it could be something besides a checker!)
    this.current_cell = gameBoard.boardArr[cellRow][cellCol]; // piece needs to know what its current cell/location is.
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

    // this.object = eval("new " + type + "(this)"); // based on the piece type, you need to create the more specific piece object (Checker, Pawn, Rook, etc.)
    // this.piece = this.object.piece;

    /* FROM CHECKER */
    this.piece =  document.createElementNS("http://www.w3.org/2000/svg","g");        // a shortcut to the actual svg piece object

    /* NOT SURE IF I NEED */
    // if(this.player == playerId){
    //   this.piece.setAttributeNS(null,"style","cursor: pointer;");           // change the cursor
    // }

    this.piece.setAttributeNS(null,"transform","translate("+this.x+","+this.y+")");

    // create the svg 'checker' piece.
    var circ = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circ.setAttributeNS(null,"r",'30');
    circ.setAttributeNS(null,"class",'player' + this.player);          // change the color according to player
    this.piece.appendChild(circ);                       // add the svg 'checker' to svg group
    //create more circles to prove I'm moving the group (and to make it purty)
    var circ2 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circ2.setAttributeNS(null,"r",'25');
    circ2.setAttributeNS(null,"fill",'white');
    circ2.setAttributeNS(null,"opacity",'0.1');
    this.piece.appendChild(circ2);


    /* END FROM CHECKER */

    this.setAtt("id",this.id);            // make sure the SVG object has the correct id value (make sure it can be dragged)
    document.getElementsByTagName('svg')[0].appendChild(this.piece);

    gameBoard.boardArr[cellRow][cellCol].occupied = Array(player,cellRow, cellCol);
    for (var i = 0; i <= gameBoard.directionArr.length-1; i++) {
      for (var k = 0; k <= gameBoard.directionArr[i].direction.length-1; k++) {
        if(this.countDirection(gameBoard.directionArr[i].direction[k])){
          EventChannel.trigger('end:game', {'player':this.player, 'msg':gameBoard.directionArr[i].message});
          return;
        }
      }
      this.connections=0;
    }


    // return this;
  }


  Piece.prototype = {

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
      var checkedCell = gameBoard.boardArr[checkerRow][checkerCol];
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
          if(checkerRow >= gameBoard.BOARDHEIGHT-1) return;
          checkerRow++;
          if (typeof gameBoard.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'right':
          if(checkerCol >= gameBoard.BOARDWIDTH-1) return;
          checkerCol++;
          if (typeof gameBoard.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'left':
          if(checkerCol === 0) return;
          checkerCol--;
          if (typeof gameBoard.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'aboveRight':
          if(checkerCol >= gameBoard.BOARDWIDTH-1 || checkerRow === 0) return;
          checkerRow--;
          checkerCol++;
          if (typeof gameBoard.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'aboveLeft':
          if(checkerCol === 0 || checkerRow === 0) return;
          checkerRow--;
          checkerCol--;
          if (typeof gameBoard.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'belowRight':
          if(checkerRow >= gameBoard.BOARDHEIGHT-1 || checkerCol >= gameBoard.BOARDWIDTH-1) return;
          checkerRow++;
          checkerCol++;
          if (typeof gameBoard.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        case 'belowLeft':
          if(checkerRow >= gameBoard.BOARDHEIGHT-1 || checkerCol === 0) return;
          checkerRow++;
          checkerCol--;
          if (typeof gameBoard.boardArr[checkerRow][checkerCol] != "undefined")
          {
            this.countConnections(direction);
          }
          break;
        default:
          break;
      }
    },

    // function that allows a quick setting of an attribute of the specific piece object
    setAtt: function(att,val) {
      this.piece.setAttributeNS(null,att,val);
    },

    //when called, will remove the piece from the document and then re-append it (put it on top!)
    putOnTop: function() {
      document.getElementsByTagName('svg')[0].removeChild(this.piece);
      document.getElementsByTagName('svg')[0].appendChild(this.piece);
    }
  }



  return Piece;

});