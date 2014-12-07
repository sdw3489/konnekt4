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
      var page = module.config().page;
      if(page === 'dashboard'){
        new DashboardView();
      }else if(page === 'game'){
        new GameView();
      }else if(page === 'users'){
        new UsersView();
      }
      if(page != 'login' && page != 'signup'){
        new NotificationView();
      }
    }
  });

  return BaseView;

});