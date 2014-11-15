define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/loggedInUsersTemplate.html',
  'events/Channel'
], function($, _, Backbone, LoggedInUsersTemplate, EventsChannel ){

  var LoggedInUsersView = Backbone.View.extend({
    el:'.js-logged-in-users',
    template:_.template(LoggedInUsersTemplate),
    data:null,
    prevData:'',
    $btn:null,
    timer :null,
    events: {
      'click .js-challenge': 'challengeUser'
    },

    initialize: function () {
      this.getLoggedInUsers();
      EventsChannel.on('updateChallenges', this.onUpadteChallenges, this);
    },
    render: function (data) {
      return this.template(data);
    },
    addOne : function(data){
      this.$el.append(this.render(data));
    },
    getLoggedInUsers : function(){
      $.ajax({
        type: "GET",
        url: '/user/getLoggedIn/',
        success: _.bind(this.onGetLoggedInUsers, this)
      });
      clearTimeout(this.timer);
      this.timer=setTimeout(_.bind(function(){
        this.getLoggedInUsers()
      },this), 5000);
    },
    onGetLoggedInUsers : function(jsonText) {
      this.data = JSON.parse(jsonText);
      if(!_.isEqual(this.data, this.prevData)){
        this.prevData = this.data;
        this.$el.html('');
        if(this.data != null){
          for(i in this.data){
            this.addOne(this.data[i]);
          }
        }else{
           this.addOne({user_Id:''});
        }
      }
    },
    challengeUser : function(event){
      event.preventDefault();
      this.$btn = $(event.target),
        id = this.$btn.data('id');

      this.$btn.addClass('disabled');
      this.$btn.text('Please Wait...');
      EventsChannel.trigger('challengeUser');

      $.ajax({
        type: "POST",
        url: '/game/challenge/'+id,
        success: _.bind(function(event){
          this.$btn.blur();
        }, this)
      });
    },
    onUpadteChallenges : function(){
      if(this.$btn){
        this.$btn.text('Challenge');
        this.$btn.removeClass('disabled');
        this.$btn = null;
      }
    }

  });

  return LoggedInUsersView;

});