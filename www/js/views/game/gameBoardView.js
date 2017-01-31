define([
  'jquery',
  'underscore',
  'backbone',
  'classes/Cell',
  'classes/Piece',
  'events/channel',
  'utils/utils',
], function($, _, Backbone, Cell, Piece, EventsChannel, utils ){

  var gameBoardView = Backbone.View.extend({

    el:'.js-game-svg',
    $turnAlert : $('.js-turn-alert'),
    $gameAlert : $('.js-game-alert'),

    events: {},

    initialize: function () {
      EventsChannel.on('getMove', this.getMove, this);
      EventsChannel.on('Cell:clicked', this.placePiece, this);
      this.render();
    },
    render: function () {
      //create a parent to stick board in...
      this.gameBoard = utils.createSVG('g',{
        "id" : "game-board"
      });
      //stick g on board
      this.$el.append(this.gameBoard);

      //create the board...
      for(i=0;i<this.model.get('BOARDHEIGHT');i++){//rows i
        this.model.get('boardArr')[i]=new Array();
        for(j=0;j<this.model.get('BOARDWIDTH');j++){//cols j
          var cell = new Cell({
            model: {
              id : 'cell_'+j+i,
              size : 75,
              col : j,
              row : i
            }
          });
          this.model.get('boardArr')[i][j] = cell;
          $(this.gameBoard).append(cell.el);
        }
      }
      if(this.model.get('moves').length>0) this.drawMoves();
    },
    addPiece: function(opts){
      this.model.set('numPieces', this.model.get('numPieces')+1);
      var piece = new Piece({
        attributes : {
          board : 'game_'+this.model.get('id'),
          player : opts.playerId,
          cellRow : opts.row,
          cellCol : opts.col,
          num : this.model.get('numPieces'),
          GameView : this
        }
      });
      $(this.gameBoard).append(piece.el);
      this.model.get('pieceArr').push(piece);
    },
    drawMoves: function(){
      var moves = this.model.get('moves');
      for(var i=0; i <= moves.length-1; i++){
          this.addPiece({
            playerId : moves[i].pId,
            row      : moves[i].r,
            col      : moves[i].c
          });
       }
    },
    //************************ NEW FUNCTION ***********************/
    placePiece: function(data){
      var col = data.col;
      if(this.model.get('active')===true){
        //checks from the bottom of the board up.
        for(var row=this.model.get('boardArr').length-1; row >= 0; row--){
          //get the target cell based on the col passed into the function and the i variable which counts bottom up
          var targetSpot = this.model.get('boardArr')[row][col];
          //if the target drop spot cell is not already occupied
          if(targetSpot.occupied === null)
          {
            //if its the current players turn add a new piece at the target spot
            if(this.model.get('playerId') == this.model.get('turn')){
              this.addPiece({
                playerId:this.model.get('playerId'),
                row:row,
                col:col
              });

              this.model.get('moves').push({
                pId:this.model.get('playerId'),
                c:col,
                r:row
              });

              $.ajax({
                type: "POST",
                url: '/api/games/last_move/',
                data: {
                  id : this.model.get('id'),
                  last_move : JSON.stringify({'col':col, 'row':row}),
                },
                success: _.bind(this.onChangeBoard, this)
              });

              $.ajax({
                type: "POST",
                url: '/api/games/board/',
                data: {
                  id : this.model.get('id'),
                  board: JSON.stringify(this.model.get('moves')),
                },
                success: _.bind(this.onChangeBoard, this)
              });

              $.ajax({
                type: "POST",
                url: '/api/games/turn/',
                data: {id: this.model.get('id')},
                success: _.bind(this.onChangeServerTurn, this)
              });
              this.model.changeTurn();

            }else{// if its not your turn throw a not your turn error at the top of the game board
              var hit=false;
              this.turnWarning();
            }
            break;
          }
        }
      }else{
        this.gameWarning();
      }
    },
    getMove:function(){
      $.ajax({
        type: "GET",
        url: '/api/games/last_move/id/'+this.model.get('id'),
        success: _.bind(this.onGetMove, this)
      });
    },
    onGetMove: function(jsonText){
      var obj = (typeof jsonText == 'string')? JSON.parse(jsonText) : jsonText;
      var lastMove = (typeof obj['last_move'] == 'string')? JSON.parse(obj['last_move']) : obj['last_move'];

      var row = lastMove['row'],
          col = lastMove['col'],
          opponentId = Math.abs(this.model.get('playerId')-1);


      if(col != null || row != null){
        this.addPiece({
          playerId:opponentId,
          row:row,
          col:col
        });
        this.model.get('moves').push({
          pId: opponentId,
          r:row,
          c:col
        });
      }

    },
    onChangeBoard: function(){},
    onChangeServerTurn: function(){},

    /////////////////////////////////Messages to user/////////////////////////////////
    ////nytwarning (not your turn)/////
    //  tell player it isn't his turn!
    ////////////////
    turnWarning: function(){
      if(!this.$turnAlert.is(':visible')){
        this.$turnAlert.slideDown();
        setTimeout(_.bind(function(){
          this.turnWarning();
        },this),3000);
      }else{
        this.$turnAlert.slideUp();
      }
    },
    gameWarning: function(){
      if(!this.$gameAlert.is(':visible')){
        this.$gameAlert.slideDown();
        setTimeout(_.bind(function(){
          this.gameWarning();
        },this),3000);
      }else{
        this.$gameAlert.slideUp();
      }
    }

  });

  return gameBoardView;

});