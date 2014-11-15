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

  var FoyerView = Backbone.View.extend({
    initialize: function () {
      new ChatView();
      new ChallengesView();
      new ChallengersView();
      new LoggedInUsersView();
    }
  });

  return FoyerView;

});