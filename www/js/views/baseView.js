define([
  'jquery',
  'underscore',
  'backbone',
  'views/foyerView',
  'views/gameView'
], function($, _, Backbone, FoyerView, GameView ){

  var BaseView = Backbone.View.extend({
    initialize: function () {
      var bodyClass = $('body').attr('class');
      if(bodyClass==='foyer'){
        new FoyerView();
      }else if(bodyClass === 'game'){
        new GameView();
      }
    }
  });

  return BaseView;

});