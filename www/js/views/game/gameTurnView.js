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
    yourClass : 'list-group-item-success',
    oppClass : 'list-group-item-danger',
    yourText : 'Your Turn',
    oppText : 'Opponents Turn',

    initialize: function () {
      this.model.on('change:turn', this.render, this);
    },
    render: function () {
      if(this.model.get('playerId') === this.model.get('turn')){
        this.$el.html(this.template({ turn: this.yourText }))
                .addClass(this.yourClass)
                .removeClass(this.oppClass);
      }else{
        this.$el.html(this.template({ turn: this.oppText }))
                .addClass(this.oppClass)
                .removeClass(this.yourClass);
      }
      return this;
    }

  });

  return GameTurnView;

});