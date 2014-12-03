define([
  'jquery',
  'underscore',
  'backbone',
  'module',
  'dv/dashboardView',
  'gv/gameView',
  'uv/usersView',
  'views/notificationView'
], function($, _, Backbone, module, DashboardView, GameView, UsersView, NotificationView ){

  var BaseView = Backbone.View.extend({
    initialize: function () {
      new NotificationView();
      if(module.config().page === 'dashboard'){
        new DashboardView();
      }else if(module.config().page === 'game'){
        new GameView();
      }else if(module.config().page === 'users'){
        new UsersView();
      }
    }
  });

  return BaseView;

});