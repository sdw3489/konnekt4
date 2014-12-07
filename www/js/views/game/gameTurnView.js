define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/turnTemplate.html'
], function($, _, Backbone, TurnTemplate ){

  var GameTurnView = Backbone.View.extend({

    tagName:'li',
    className: 'list-group-item',
    template:_.template(TurnTemplate),
    yourText : 'Your Turn',
    oppText : 'Opponents Turn',

    initialize: function () {
      this.model.on('change', this.render, this);
    },
    render: function () {
      if(this.model.get('playerId') === this.model.get('turn')){
        this.$el.html(this.template({ turn: this.yourText }))
                .addClass('player'+this.model.get('playerId')+'-turn')
                .removeClass('player'+Math.abs(this.model.get('playerId')-1)+'-turn');
      }else{
        this.$el.html(this.template({ turn: this.oppText }))
                .addClass('player'+Math.abs(this.model.get('playerId')-1)+'-turn')
                .removeClass('player'+this.model.get('playerId')+'-turn');
      }
      return this;
    }

  });

  return GameTurnView;

});