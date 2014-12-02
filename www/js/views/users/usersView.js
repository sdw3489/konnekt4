define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone ){

  var UsersView = Backbone.View.extend({

    $btn:null,
    events: {},

    initialize: function () {
      $('.js-user-action').on('click', _.bind(this.connectUser, this));
    },
    render: function () {},
    connectUser: function(event){
      event.preventDefault();
      this.$btn = $(event.target),
        id = this.$btn.data('id'),
        type = this.$btn.data('connection-type');
      this.$btn.button('loading');

      $.ajax({
        type: "POST",
        url: '/user/connect/'+id,
        data:{
          'type': type
        },
        success: _.bind(function(event){
          this.$btn.blur();
        }, this)
      });
    }

  });

  return UsersView;

});