define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone ){

  var UsersView = Backbone.View.extend({

    $btn:null,
    events: {},

    initialize: function () {
      console.log("UsersView");
      $('.js-challenge').on('click', _.bind(this.challengeUser, this));
      $('.js-connect-user').on('click', _.bind(this.connectUser, this));
      $('.js-remove-user').on('click', _.bind(this.removeUser, this));
      $('.js-accept-user').on('click', _.bind(this.acceptUser, this));
      $('.js-decline-user').on('click', _.bind(this.declineUser, this));
    },
    render: function () {

    },
    challengeUser : function(event){
      event.preventDefault();
      this.$btn = $(event.target),
        id = this.$btn.data('id');

      this.$btn.button('loading');
      // EventsChannel.trigger('challengeUser');

      $.ajax({
        type: "POST",
        url: '/game/challenge/'+id,
        success: _.bind(function(event){
          this.$btn.blur();
        }, this)
      });
    },
    connectUser: function(event){
      console.log("connectUser");

      event.preventDefault();
      this.$btn = $(event.target),
        id = this.$btn.data('id');
      this.$btn.button('loading');

      $.ajax({
        type: "POST",
        url: '/user/connect/'+id,
        success: _.bind(function(event){
          this.$btn.blur();
        }, this)
      });


    },
    removeUser: function(event){
      console.log("removeUser");
      event.preventDefault();
      this.$btn = $(event.target),
        id = this.$btn.data('id');
      // this.$btn.button('loading');

      $.ajax({
        type: "POST",
        url: '/user/remove/'+id,
        success: _.bind(function(data){
          console.log(data);
          this.$btn.blur();
        }, this)
      });
    },
    acceptUser: function(event){
      console.log("acceptUser");

      event.preventDefault();
      this.$btn = $(event.target),
        id = this.$btn.data('id');
      // this.$btn.button('loading');

      $.ajax({
        type: "POST",
        url: '/user/accept/'+id,
        success: _.bind(function(data){
          console.log(data);
          this.$btn.blur();
        }, this)
      });
    },
    declineUser: function(event){
      console.log("declineUser");

      event.preventDefault();
      this.$btn = $(event.target),
        id = this.$btn.data('id');
      // this.$btn.button('loading');

      $.ajax({
        type: "POST",
        url: '/user/decline/'+id,
        success: _.bind(function(data){
          console.log(data);
          this.$btn.blur();
        }, this)
      });
    }
  });

  return UsersView;

});