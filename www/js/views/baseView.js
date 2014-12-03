define([
  'jquery',
  'underscore',
  'backbone',
  'module',
  'fv/foyerView',
  'gv/gameView',
  'uv/usersView',
  'views/notificationView'
], function($, _, Backbone, module, FoyerView, GameView, UsersView, NotificationView ){

  var BaseView = Backbone.View.extend({
    initialize: function () {
      new NotificationView();
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