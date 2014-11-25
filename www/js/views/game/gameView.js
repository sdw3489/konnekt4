define([
  'jquery',
  'underscore',
  'backbone',
  'models/gameModel',
  'gv/gameBoardView',
  'gv/gamePlayerView',
  'gv/gameTurnView',
  'gv/gameEndView',
  'events/channel',
  'module'
], function($, _, Backbone, GameModel, GameBoardView, GamePlayerView, GameTurnView, GameEndView, EventsChannel, module){

  var GameView = Backbone.View.extend({

    game : module.config(),
    boardView : null,
    infoView  : null,
    endView   : null,
    infoView  : null,

    initialize: function () {

      this.model = new GameModel({
        game_id         : this.game.game_id,
        turn            : this.game.whose_turn,
        playerId        : this.game.current_player.playerId,
        player2Id       : this.game.opponent_player.playerId,
        current_player  : this.game.current_player.name,
        opponent_player : this.game.opponent_player.name,
        current_Id      : this.game.current_player.id,
        opponent_Id     : this.game.opponent_player.id,
        players         : this.game.players,
        moves           : (this.game.board != null)? JSON.parse(this.game.board) : []
      });

      this.infoView = $('.js-info-view');
      this.render();
    },
    render: function(){

      _.each(this.model.get('players'), _.bind(function(player){
        var playerView = new GamePlayerView({
          model:player
        });
        this.infoView.append(playerView.render().el);
      }, this));

      this.turnView = new GameTurnView({
        model:this.model
      });
      this.infoView.append(this.turnView.render().el);

      this.boardView = new GameBoardView({
        model:this.model
      });

      this.endView = new GameEndView();
    }

  });

  return GameView;

});