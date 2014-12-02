define([
  'jquery',
  'underscore',
  'backbone',
  'fv/chatView',
  'fv/userConnectionsView',
  'fv/challengesView',
  'fv/challengersView'
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