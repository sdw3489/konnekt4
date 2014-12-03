define([
  'jquery',
  'underscore',
  'backbone',
  'dv/chatView',
  'dv/userConnectionsView',
  'dv/challengesView',
  'dv/challengersView'
], function($, _, Backbone, ChatView, LoggedInUsersView, ChallengesView, ChallengersView ){

  var DashboardView = Backbone.View.extend({
    initialize: function () {
      new ChatView();
      new ChallengesView();
      new ChallengersView();
      new LoggedInUsersView();
    }
  });

  return DashboardView;

});