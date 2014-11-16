define([
  'jquery',
  'underscore',
  'backbone',
  'classes/cell',
  'classes/piece',
  'module'
], function($, _, Backbone, Cell, Piece, module){

  var GameView = Backbone.View.extend({

    xhtmlns : "http://www.w3.org/1999/xhtml",
    svgns : "http://www.w3.org/2000/svg",
    // BOARDX : 0,               //starting pos of board
    // BOARDY : 0,               //look above
    boardArr : [],   //2d array [row][col]
    pieceArr : [],   //2d array [player][piece] (player is either 0 or 1)
    directionArr : [
      {
        direction: ['right','left'],
        message:'Won with 4 Across.'
      },
      {
        direction: ['below'],
        message:'Won with 4 Stacked.'
      },
      {
        direction: ['aboveRight','belowLeft'],
        message:'Won with 4 Diagonal Right.'
      },
      {
        direction: ['aboveLeft','belowRight'],
        message:'Won with 4 Diagonal Left.'
      }
    ],
    BOARDWIDTH : 7,       //how many squares across
    BOARDHEIGHT : 6,      //how many squares down
    myX:null,                  //hold my last pos.
    myY:null,                  //hold my last pos.
    numPieces:0,          //hold the number of pieces
    game: module.config(),
    turn:module.config().whoseTurn,
    playerId:null,
    player2Id:null,

    initialize: function () {
      console.log(JSON.stringify(this.game));

      if(this.game.current_player == this.game.player0_Id){
        this.playerId = 0;
        this.player2Id = 1;
      }else{
        this.playerId = 1;
        this.player2Id = 0;
      }

      this.userInfo();
      this.createBoard();
    },
    userInfo: function(){
      if(this.game.current_player === this.game.player0_Id){
        $('#youPlayer').html('You are: '+this.game.player0_name);
        $('#opponentPlayer').html('Opponent is: '+this.game.player1_name);
      }else{
        $('#youPlayer').html('You are: '+this.game.player1_name);
        $('#opponentPlayer').html('Opponent is: '+this.game.player0_name);
      }

      //put the player in the text
      if(this.playerId === this.turn){
        $("#turnInfo").html("Your Turn")
          .addClass('list-group-item-success')
          .removeClass('list-group-item-danger');
      }else{
        $("#turnInfo").html("Opponents Turn")
          .addClass('list-group-item-danger')
          .removeClass('list-group-item-success');
      }
    },
    createBoard: function(){
      //create a parent to stick board in...
      var gEle=document.createElementNS(this.svgns,'g');
      // gEle.setAttributeNS(null,'transform','translate('+this.BOARDX+','+this.BOARDY+')');
      gEle.setAttributeNS(null,"id","game_1");
      gEle.setAttributeNS(null,'stroke','blue');
      //stick g on board

      document.getElementsByTagName('svg')[0].insertBefore(gEle,document.getElementsByTagName('svg')[0].childNodes[4]);

      //create the board...
      for(i=0;i<this.BOARDHEIGHT;i++){//rows i
        this.boardArr[i]=new Array();
        for(j=0;j<this.BOARDWIDTH;j++){//cols j
          this.boardArr[i][j]=new Cell(document.getElementById("game_1"),'cell_'+j+i,75,j,i);

          console.log(this.boardArr[i][j]);
          $(this.boardArr[i][j].object).bind('click', _.bind(function(event) {
            console.log(j);
            this.placePiece(3);
          }, this));

        }
      }


      this.ajax_getTurn('/game/getTurn/'+this.game.game_Id, this.onGetTurn);
    },
    ajax_getTurn: function(){
      if(this.turn!=this.playerId){
        $.ajax({
          type: "GET",
          url: arguments[0],
          success: arguments[1]
        });
      }
      setTimeout(_.bind(function(){
        this.ajax_getTurn('/game/getTurn/'+this.game.game_Id, this.onGetTurn);
      },this), 3000);
    },
    onGetTurn:function(){
      var obj = JSON.parse(jsonText)[0];
      if(obj.whoseTurn == this.playerId){
        //switch turns
        this.turn=obj.whoseTurn;
        $("#turnInfo").html("Your Turn").addClass('list-group-item-success').removeClass('list-group-item-danger');
        //get the data from the last guys move
        $.ajax({
          type: "GET",
          url: '/game/getMove/'+this.game.game_Id,
          success: _.bind(this.onGetMove, this)
        });
      }
    },
    onGetMove: function(jsonText){
      var obj = JSON.parse(jsonText);
      //shortcuts
      var ppiece=obj[0]['player'+Math.abs(this.playerId-1)+'_pieceID'];
      var pbR=obj[0]['player'+Math.abs(this.playerId-1)+'_boardR'];
      var pbC=obj[0]['player'+Math.abs(this.playerId-1)+'_boardC'];

      if(pbC != null || pbR != null){
        var temp = new Piece("game_"+this.game.game_Id,Math.abs(this.playerId-1),pbR,pbC,'Checker',1);
      }

    },


    //************************ NEW FUNCTION ***********************/
    placePiece: function(col){
      //checks from the bottom of the board up.
      for(var row=this.boardArr.length-1; row >= 0; row--){
        //get the target cell based on the col passed into the function and the i variable which counts bottom up
        var targetSpot = this.boardArr[row][col];
        //if the target drop spot cell is not already occupied
        if(targetSpot.occupied === null)
        {
          //if its the current players turn add a new piece at the target spot
          if(this.playerId == this.turn){
            this.numPieces++;
            var piece = new Piece('game_'+this.game.game_Id,this.playerId,row,col,'Checker',this.numPieces);

            /* Moved from Piece class */
            this.boardArr[row][col].occupied = Array(this.playerId,row, col);
            for (var i = 0; i <= this.directionArr.length-1; i++) {
              for (var k = 0; k <= this.directionArr[i].direction.length-1; k++) {
                if(piece.countDirection(this.directionArr[i].direction[k])){
                  this.gameEnd(this.playerId, this.directionArr[i].message);
                  return;
                }
              }
              piece.connections=0;
            }


            this.ajax_utility('/game/changeBoard/'+this.game.game_Id+'/'+this.playerId+'/'+targetSpot.id+'/'+row+'/'+col, this.onChangeBoard);
            this.changeTurn();
          }else{// if its not your turn throw a not your turn error at the top of the game board
            var hit=false;
            this.nytwarning();
          }
          break;
        }
      }

    },
    onChangeBoard: function(){},


    ///////////////////////////////Utilities////////////////////////////////////////
    ////get Piece/////
    //  get the piece (object) from the id and return it...
    ////////////////
    getPiece: function(which){
      return this.pieceArr[parseInt(which.substr((which.search(/\_/)+1),1))][parseInt(which.substring((which.search(/\|/)+1),which.length))];
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
    },

    ////change turn////
    //  change who's turn it is
    //////////////////
    changeTurn: function(){
      //locally, for the name color
      if(this.turn == 0){
        this.turn=1;
      }else{
        this.turn=0;
      }
      //how about for the server (and other player)?
      //send JSON message to server, have both clients monitor server to know who's turn it is...
       if(this.playerId === this.turn){
        $("#turnInfo").html("Your Turn")
          .addClass('list-group-item-success')
          .removeClass('list-group-item-danger');
      }else{
        $("#turnInfo").html("Opponents Turn")
          .addClass('list-group-item-danger')
          .removeClass('list-group-item-success');
      }
      this.ajax_utility('/game/changeTurn/'+this.game.game_Id, this.onChangeServerTurn);
    },
    onChangeServerTurn: function(){},

    /////////////////////////////////Messages to user/////////////////////////////////
    ////nytwarning (not your turn)/////
    //  tell player it isn't his turn!
    ////////////////
    nytwarning: function(){
      var $alert = $(".js-turn-alert");
      if(!$alert.is(':visible')){
        $alert.slideDown();
        setTimeout('nytwarning()',3000);
      }else{
        $alert.slideUp();
      }
    },

    gameEnd: function(player, msg){
      $('.js-game-end-msg').html("<p>Player "+player+" "+ msg+"</p>");
      $('.js-game-end-modal').modal();
    },

    ajax_utility:function(){
      $.ajax({
        type: "GET",
        url: arguments[0],
        success: _.bind(arguments[1], this)
      });
    }


  });

  return GameView;

});