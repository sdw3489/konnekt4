define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/challengersTemplate.html'
], function($, _, Backbone, challengersTemplate ){

  var challengersView = Backbone.View.extend({
    el:'#games-avail2',
    template:_.template(challengersTemplate),
    events: {},
    data:null,

    initialize: function () {
      this.getChallengers();
    },
    render: function (data) {
      this.$el.html(this.template(data));
      return this;
    },
    getChallengers: function(){
      $.ajax({
        type: "GET",
        url: '/game/getChallengers/',
        success: _.bind(this.onGetChallengers, this)
      });

      setTimeout(_.bind(function(){
        this.getChallengers()
      },this), 4000);
    },
    onGetChallengers:function(jsonText){
      this.data = JSON.parse(jsonText);
      if(this.data != null){
        for(i in this.data){
          this.render(this.data[i]);
        }
      }else{
        this.render({username:'', game_Id:''});
      }
    }
  });

  return challengersView;

});