define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone ){

  var ChatBoxView = Backbone.View.extend({
    tagName:'p',
    template: _.template("<strong><%= user.username %></strong>: <%= message %>"),
    render: function (data) {
      this.$el.html(this.template(data));
      return this;
    }
  });

  return ChatBoxView;

});