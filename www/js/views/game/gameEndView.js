define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel'
], function($, _, Backbone, EventsChannel ){

  var GameEndView = Backbone.View.extend({
    el: '.js-game-end-msg',
    template: _.template("<p>Player <%= player %> <%= msg %></p>"),
    $endModal : $('.js-game-end-modal'),
    events: {},

    initialize: function () {
      EventsChannel.on('gameEnd', this.render, this);
    },
    render: function (data) {
      this.$el.html(this.template(data));
      this.$endModal.modal();
    }
  });

  return GameEndView;

});