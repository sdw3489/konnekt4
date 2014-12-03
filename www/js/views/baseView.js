define([
  'jquery',
  'underscore',
  'backbone',
  'module',
  'fv/foyerView',
  'gv/gameView',
  'uv/usersView'
], function($, _, Backbone, module, FoyerView, GameView, UsersView ){

  var BaseView = Backbone.View.extend({
    initialize: function () {
      if(module.config().page === 'foyer'){
        new FoyerView();
      }else if(module.config().page === 'game'){
        new GameView();
      }else if(module.config().page === 'users'){
        new UsersView();
      }
    }
  });

  return BaseView;

});