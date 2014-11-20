define([
  'jquery',
  'underscore',
  'backbone',
  'models/gameModel',
  'gv/gameBoardView',
  'gv/gamePlayerView',
  'gv/gameTurnView',
  'events/channel',
  'module'
], function($, _, Backbone, GameModel, GameBoardView, GamePlayerView, GameTurnView, EventsChannel, module){

  var GameView = Backbone.View.extend({

    game : module.config(),
    turnTimer : null,
    $infoView : $('.js-info-view'),
    $endMsg : $('.js-game-end-msg'),
    $endModal : $('.js-game-end-modal'),
    boardView : null,
    infoView : null,

    initialize: function () {
      EventsChannel.on('gameEnd', this.gameEnd, this);

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

      this.turnView = new GameTurnView({
        model:this.model
      });
      this.$infoView.append(this.turnView.render().el);

      this.render();
      this.getTurn();
    },
    render: function(){

      this.boardView = new GameBoardView({
        model:this.model
      });

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
        this.boardView.getMove();
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