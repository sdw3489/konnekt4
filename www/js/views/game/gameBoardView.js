define([
  'jquery',
  'underscore',
  'backbone',
  'classes/Cell',
  'classes/Piece',
  'events/channel',
], function($, _, Backbone, Cell, Piece, EventsChannel ){

  var gameBoardView = Backbone.View.extend({

    el:'.js-game-svg',
    $turnAlert : $('.js-turn-alert'),
    $gameAlert : $('.js-game-alert'),

    events: {},

    initialize: function () {
      EventsChannel.on('getMove', this.getMove, this);
      this.render();
    },
    render: function () {
      //create a parent to stick board in...
      var gEle=document.createElementNS(this.model.get('svgns'),'g');
      gEle.setAttributeNS(null,'id','game-board');
      gEle.setAttributeNS(null,'stroke','blue');
      //stick g on board
      this.$el.append(gEle);

      //create the board...
      for(i=0;i<this.model.get('BOARDHEIGHT');i++){//rows i
        this.model.get('boardArr')[i]=new Array();
        for(j=0;j<this.model.get('BOARDWIDTH');j++){//cols j
          this.model.get('boardArr')[i][j]=new Cell($('#game-board')[0],'cell_'+j+i,75,j,i,this);
        }
      }
      if(this.model.get('moves').length>0) this.drawMoves();
    },
    addPiece: function(opts){
      this.model.set('numPieces', this.model.get('numPieces')+1);
      var piece = new Piece('game_'+this.model.get('game_id'),opts.playerId, opts.row,opts.col,this.model.get('numPieces'), this);
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
    placePiece: function(col){
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

              this.ajax_utility('/game/updateLastMove/'+this.model.get('game_id'), this.onChangeBoard, JSON.stringify({col:col, row:row}), "POST");
              this.ajax_utility('/game/updateBoard/'+this.model.get('game_id'), this.onChangeBoard, JSON.stringify(this.model.get('moves')), "POST");
              this.ajax_utility('/game/changeTurn/'+this.model.get('game_id'), this.onChangeServerTurn);
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
      this.ajax_utility('/game/getMove/'+this.model.get('game_id'), this.onGetMove);
    },
    onGetMove: function(jsonText){
      var obj = JSON.parse(jsonText),
          row = obj['row'],
          col = obj['col'],
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
    },
    ajax_utility:function(){
      $.ajax({
        type: (arguments[3])? arguments[3] : "GET",
        url: arguments[0],
        data: (arguments[2])? {data:arguments[2]} : '',
        success: _.bind(arguments[1], this)
      });
    }


  });

  return gameBoardView;

});