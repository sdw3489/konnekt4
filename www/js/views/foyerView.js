define([
  'jquery',
  'underscore',
  'backbone',
  'views/chatView',
  'views/loggedInUsersView',
  'views/challengesView',
  'views/challengersView'
  // 'views/statsView'
], function($, _, Backbone, ChatView, LoggedInUsersView, ChallengesView, ChallengersView ){

  var baseView = Backbone.View.extend({
    initialize: function () {
      new ChatView();
    }
  });

  return baseView;

});