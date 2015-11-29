define([
  'jquery',
  'underscore',
  'backbone',
  'dv/chatView',
  'dv/userConnectionsView',
  'dv/challengesView'
], function($, _, Backbone, ChatView, LoggedInUsersView, ChallengesView ){

  var DashboardView = Backbone.View.extend({
    initialize: function () {
      new ChatView();
      new ChallengesView();
      new LoggedInUsersView();
    }
  });

  return DashboardView;

});