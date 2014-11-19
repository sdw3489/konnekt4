define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/playerTemplate.html',
  'text!templates/opponentTemplate.html'
], function($, _, Backbone, PlayerTemplate, OpponentTemplate ){

  var GamePlayerView = Backbone.View.extend({

    tagName:'li',
    className: 'list-group-item',
    playerTemp : _.template(PlayerTemplate),
    opponentTemp : _.template(OpponentTemplate),
    template :null,
    events: {},

    initialize: function () {
      if(this.model.current === true){
        this.template = this.playerTemp;
      }else{
        this.template = this.opponentTemp;
      }
    },
    render: function () {
      this.$el.html(this.template(this.model));
      return this;
    }
  });

  return GamePlayerView;

});