define([
  'jquery',
  'underscore',
  'backbone',
  'gv/gamePlayerView'
], function($, _, Backbone, GamePlayerView ){

  var GameInfoView = Backbone.View.extend({

    current_player : null,
    opponent_player : null,
    events : {},

    initialize: function () {

      if(this.attributes.current_player === this.attributes.player0_Id){
        this.current_player = this.attributes.player0_name;
        this.opponent_player = this.attributes.player1_name;
      }else{
        this.current_player = this.attributes.player1_name;
        this.opponent_player = this.attributes.player0_name;
      }

      var playerView = new GamePlayerView({
        el:'#youPlayer',
        attributes:{
          username: this.current_player,
          copy: 'You are:'
        }
      });

      var opponentView = new GamePlayerView({
        el:'#opponentPlayer',
        attributes:{
          username: this.opponent_player,
          copy: 'Opponent is:'
        }
      });

    },
    render: function () {
    }
  });

  return GameInfoView;

});