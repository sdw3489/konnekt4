define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel',
  'text!templates/gameEndTemplate.html'
], function($, _, Backbone, EventsChannel, GameEndTemplate ){

  var GameEndView = Backbone.View.extend({
    el: '.js-game-end-msg',
    template: _.template(GameEndTemplate),
    $endModal : $('.js-game-end-modal'),
    events: {},

    initialize: function () {
      EventsChannel.on('game:end', this.gameEnd, this);
    },
    render: function(data){
      this.$el.html(this.template(data));
      this.$endModal.modal();
    },
    gameEnd: function (data){
      this.render(data);
      this.model.set('active',0);
      if(data.winner.playerId == this.model.get('playerId')){
        this.onGameEnd(data);
      }
    },
    onGameEnd: function(data){
      $.ajax({
        type:  "POST",
        url: '/api/games/end/',
        data:{
          'id'   : this.model.get('id'),
          'data' : data
        }
      });
    }
  });

  return GameEndView;

});