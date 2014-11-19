define([
  'jquery',
  'underscore',
  'backbone',
  'module',
  'fv/foyerView',
  'gv/gameView'
], function($, _, Backbone, module, FoyerView, GameView ){

  var BaseView = Backbone.View.extend({
    initialize: function () {
      if(module.config().page === 'foyer'){
        new FoyerView();
      }else if(module.config().page === 'game'){
        new GameView();
      }
    }
  });

  return BaseView;

});