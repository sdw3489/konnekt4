define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel'
], function($, _, Backbone, EventsChannel ){

  var GameEndView = Backbone.View.extend({
    el: '.js-game-end-msg',
    template: null,
    winTemplate: _.template("<p><%= winner.name %> <%= display_msg %></p>"),
    tieTemplate: _.template("<p><%= tied %> <%= display_msg %></p>"),
    $endModal : $('.js-game-end-modal'),
    events: {},

    initialize: function () {
      EventsChannel.on('game:end', this.gameEnd, this);
      EventsChannel.on('game:tied', this.gameTied, this);
    },
    render: function(data){
      this.$el.html(this.template(data));
      this.$endModal.modal();
      this.model.set('active',0);
    },
    gameEnd: function (data){
      this.template = this.winTemplate;
      if(data.winner.playerId == this.model.get('playerId')){
        this.onGameEnd(data);
      }
    },
    gameTied: function (data){
      this.template = this.tieTemplate;
      if(data.winner.playerId == this.model.get('playerId')){
        this.onGameTied(data);
      }
    },
    onGameEnd: function(data){
      $.ajax({
        type:  "POST",
        url: '/game/end/'+this.model.get('game_id'),
        data:{'data':data}
      });
    },
    onGameTied: function(data){
      $.ajax({
        type:  "POST",
        url: '/game/tied/'+this.model.get('game_id'),
        data:{'data':data}
      });
    }
  });

  return GameEndView;

});