define([
  'jquery',
  'underscore',
  'backbone',
  'views/chatView',
  'views/loggedInUsersView',
  'views/challengesView',
  'views/challengersView'
  // 'views/statsView'
], function($, _, Backbone, chatView, loggedInUsersView, challengesView, challengersView ){

  var foyerView = Backbone.View.extend({
    initialize: function () {
      new chatView();
      new challengesView();
      new challengersView();
      new loggedInUsersView();
    }
  });

  return foyerView;

});