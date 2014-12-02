define([
  'jquery',
  'underscore',
  'backbone',
  'uv/userView',
  'events/channel',
  'module'
], function($, _, Backbone, UserView, EventsChannel, module ){

  var UsersView = Backbone.View.extend({

    el : '.users-list',
    events: {},

    initialize: function () {
      this.render();
    },
    render: function () {
      _.each(module.config().users, function(user, i){
        var userView = new UserView({
          model: new Backbone.Model({
            'user'    : user,
            'user_id' : module.config().user_id
          })
        });
        this.$el.append(userView.render().$el);
      }, this);
      return this;
    }
  });

  return UsersView;

});