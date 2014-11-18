define([
  'jquery',
  'underscore',
  'backbone',
  'fv/chatView',
  'fv/loggedInUsersView',
  'fv/challengesView',
  'fv/challengersView'
   //'fv/statsView'
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