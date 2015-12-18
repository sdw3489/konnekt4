define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/userConnectionsTemplate.html',
  'events/channel'
], function($, _, Backbone, userConnectionsTemplate, EventsChannel ){

  var LoggedInUsersView = Backbone.View.extend({
    el:'.js-user-connections',
    template:_.template(userConnectionsTemplate),
    data:null,
    prevData:'',
    $btn:null,
    timer :null,
    events: {
      'click .js-challenge': 'challengeUser'
    },

    initialize: function () {
      this.getUserConnections();
      $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
      EventsChannel.on('updateChallenges', this.onUpadteChallenges, this);
    },
    render: function (data) {
      return this.template(data);
    },
    addOne : function(data){
      this.$el.append(this.render(data));
    },
    getUserConnections : function(){
      $.ajax({
        type: "GET",
        url: '/api/users/friends/',
        success: _.bind(this.onGetUserConnections, this)
      });
      clearTimeout(this.timer);
      this.timer=setTimeout(_.bind(function(){
        this.getUserConnections()
      },this), 10000);
    },
    onGetUserConnections : function(jsonText) {
      this.data = (typeof jsonText == 'string')? JSON.parse(jsonText) : jsonText;
      if(!_.isEqual(this.data, this.prevData)){
        this.prevData = this.data;
        this.$el.html('');
        if(this.data.status != false){
          for(i in this.data){
            this.addOne(this.data[i]);
          }
        }else{
           this.addOne({id:''});
        }
      }
    },
    challengeUser : function(event){
      event.preventDefault();
      this.$btn = $(event.currentTarget),
        id = this.$btn.data('id');

      this.$btn.button('loading');
      EventsChannel.trigger('challengeUser');

      $.ajax({
        type: "POST",
        url: '/api/games/new/',
        data:{
          id: id
        },
        success: _.bind(function(event){
          this.$btn.blur();
        }, this)
      });
    },
    onUpadteChallenges : function(){
      if(this.$btn){
        this.$btn.button('reset');
      }
    }

  });

  return LoggedInUsersView;

});