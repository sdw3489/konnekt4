define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/playerTemplate.html'
], function($, _, Backbone, PlayerTemplate ){

  var GamePlayerView = Backbone.View.extend({

    el:'',
    template : _.template(PlayerTemplate),
    events: {},

    initialize: function () {
      this.render(this.attributes);
    },
    render: function (data) {
      this.$el.html(this.template(data));
      return this;
    }
  });

  return GamePlayerView;

});