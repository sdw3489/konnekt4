define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/loggedInUsersTemplate.html'
], function($, _, Backbone, loggedInUsersTemplate ){

  var loggedInUsersView = Backbone.View.extend({
    el:'.js-logged-in-users',
    template:_.template(loggedInUsersTemplate),
    data:null,
    prevData:'',
    events: {},

    initialize: function () {
      this.getLoggedInUsers();
    },
    render: function (data) {
      return this.template(data);
    },
    getLoggedInUsers : function(){
      $.ajax({
        type: "GET",
        url: '/user/getLoggedIn/',
        success: _.bind(this.onGetLoggedInUsers, this)
      });
      setTimeout(_.bind(function(){
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
    addOne : function(data){
      this.$el.append(this.render(data));
    }
  });

  return loggedInUsersView;

});