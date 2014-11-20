define([
  'jquery',
  'underscore',
  'backbone',
  'models/gameModel',
  'classes/Cell',
  'classes/Piece',
  'gv/gamePlayerView',
  'gv/gameTurnView',
  'events/channel',
  'module'
], function($, _, Backbone, GameModel, Cell, Piece, GamePlayerView, GameTurnView, EventsChannel, module){

  var GameView = Backbone.View.extend({

    game : module.config(),
    turnTimer : null,
    $alert : $('.js-turn-alert'),
    $infoView : $('.js-info-view'),
    $gameBoard : $('.js-game-svg'),
    $endMsg : $('.js-game-end-msg'),
    $endModal : $('.js-game-end-modal'),

    initialize: function () {

      this.model = new GameModel({
        game_Id         : this.game.game_Id,
        turn            : this.game.whoseTurn,
        playerId        : this.game.current_player.playerId,
        player2Id       : this.game.opponent_player.playerId,
        current_player  : this.game.current_player.name,
        opponent_player : this.game.opponent_player.name,
        current_Id      : this.game.current_player.id,
        opponent_Id     : this.game.opponent_player.id,
        players         : this.game.players
      });

      _.each(this.model.get('players'), _.bind(function(player){
        var v = new GamePlayerView({
          model:player
        });
        this.$infoView.append(v.render().el);
      }, this));

      var turnView = new GameTurnView({
        model:this.model
      });
      this.$infoView.append(turnView.render().el);

      this.render();
      this.getTurn();
    },
    render: function(){
      //create a parent to stick board in...
      var gEle=document.createElementNS(this.model.get('svgns'),'g');
      gEle.setAttributeNS(null,'id','game-board');
      gEle.setAttributeNS(null,'stroke','blue');
      //stick g on board
      this.$gameBoard.append(gEle);

      //create the board...
      for(i=0;i<this.model.get('BOARDHEIGHT');i++){//rows i
        this.model.get('boardArr')[i]=new Array();
        for(j=0;j<this.model.get('BOARDWIDTH');j++){//cols j
          this.model.get('boardArr')[i][j]=new Cell($('#game-board')[0],'cell_'+j+i,75,j,i,this);
        }
      }
    },
    getTurn: function(){
      if(this.model.get('turn')!=this.model.get('playerId')){
        this.ajax_utility('/game/getTurn/'+this.model.get('game_Id'), this.onGetTurn);
      }
      clearTimeout(this.turnTimer);
      this.turnTimer = setTimeout(_.bind(function(){
        this.getTurn();
      },this), 3000);
    },
    onGetTurn:function(jsonText){
      var obj = JSON.parse(jsonText)[0];
      if(obj.whoseTurn == this.model.get('playerId')){
        //switch turns
        this.model.set('turn', obj.whoseTurn);
        //get the data from the last guys move
        this.ajax_utility('/game/getMove/'+this.model.get('game_Id'), this.onGetMove);
      }
    },
    onGetMove: function(jsonText){
      var obj = JSON.parse(jsonText),
          pieceID=obj[0]['player'+Math.abs(this.model.get('playerId')-1)+'_pieceID'],
          boardR=obj[0]['player'+Math.abs(this.model.get('playerId')-1)+'_boardR'],
          boardC=obj[0]['player'+Math.abs(this.model.get('playerId')-1)+'_boardC'];

      if(boardC != null || boardR != null){
        var piece = new Piece("game_"+this.model.get('game_Id'),Math.abs(this.model.get('playerId')-1),boardR,boardC,this.model.get('numPieces'), this);
        this.model.get('pieceArr').push(piece);
      }

    },


    //************************ NEW FUNCTION ***********************/
    placePiece: function(col){
      //checks from the bottom of the board up.
      for(var row=this.model.get('boardArr').length-1; row >= 0; row--){
        //get the target cell based on the col passed into the function and the i variable which counts bottom up
        var targetSpot = this.model.get('boardArr')[row][col];
        //if the target drop spot cell is not already occupied
        if(targetSpot.occupied === null)
        {
          //if its the current players turn add a new piece at the target spot
          if(this.model.get('playerId') == this.model.get('turn')){
            this.model.set('numPieces', this.model.get('numPieces')+1);
            var piece = new Piece('game_'+this.model.get('game_Id'),this.model.get('playerId'),row,col,this.model.get('numPieces'), this);
            this.model.get('pieceArr').push(piece);

            this.ajax_utility('/game/changeBoard/'+this.model.get('game_Id')+'/'+this.model.get('playerId')+'/'+targetSpot.id+'/'+row+'/'+col, this.onChangeBoard);
            this.ajax_utility('/game/changeTurn/'+this.model.get('game_Id'), this.onChangeServerTurn);
            this.model.changeTurn();

          }else{// if its not your turn throw a not your turn error at the top of the game board
            var hit=false;
            this.turnWarning();
          }
          break;
        }
      }

    },
    onChangeBoard: function(){},
    onChangeServerTurn: function(){},

    /////////////////////////////////Messages to user/////////////////////////////////
    ////nytwarning (not your turn)/////
    //  tell player it isn't his turn!
    ////////////////
    turnWarning: function(){
      if(!this.$alert.is(':visible')){
        this.$alert.slideDown();
        setTimeout(_.bind(function(){
          this.turnWarning();
        },this),3000);
      }else{
        this.$alert.slideUp();
      }
    },

    gameEnd: function(data){
      this.$endMsg.html("<p>Player "+data.player+" "+data.msg+"</p>");
      this.$endModal.modal();
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