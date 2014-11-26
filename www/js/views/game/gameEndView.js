define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel'
], function($, _, Backbone, EventsChannel ){

  var GameEndView = Backbone.View.extend({
    el: '.js-game-end-msg',
    template: _.template("<p><%= winner.name %> <%= display_msg %></p>"),
    $endModal : $('.js-game-end-modal'),
    events: {},

    initialize: function () {
      EventsChannel.on('game:end', this.render, this);
    },
    render: function (data) {
      this.$el.html(this.template(data));
      this.$endModal.modal();
      this.model.set('active',0);
      if(data.winner.playerId == this.model.get('playerId')){
        this.onGameEnd(data);
      }
    },
    onGameEnd: function(data){
      $.ajax({
        type:  "POST",
        url: '/game/end/'+this.model.get('game_id'),
        data:{'data':data}
      });
    }
  });

  return GameEndView;

});