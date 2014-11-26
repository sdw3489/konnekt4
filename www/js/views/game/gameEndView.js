define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel'
], function($, _, Backbone, EventsChannel ){

  var GameEndView = Backbone.View.extend({
    el: '.js-game-end-msg',
    template: _.template("<p><%= player %> <%= msg %></p>"),
    $endModal : $('.js-game-end-modal'),
    events: {},

    initialize: function () {
      EventsChannel.on('game:end', this.render, this);
      EventsChannel.on('game:end', this.onGameEnd, this);
    },
    render: function (data) {
      this.$el.html(this.template(data));
      this.$endModal.modal();
    },
    onGameEnd: function(){
      $.ajax({
        type:  "POST",
        url: '/game/updateActive/'+this.model.get('game_id')
      });
    }
  });

  return GameEndView;

});