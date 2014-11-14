define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/challengesTemplate.html'
], function($, _, Backbone, challengesTemplate ){

  var challengesView = Backbone.View.extend({
    el:'#games-avail',
    template:_.template(challengesTemplate),
    events: {},
    data:null,

    initialize: function () {
      this.getChallenges();
    },
    render: function (data) {
      this.$el.html(this.template(data));
      return this;
    },
    getChallenges: function(){
      $.ajax({
        type: "GET",
        url: '/game/getChallenges/',
        success: _.bind(this.onGetChallenges, this)
      });

      setTimeout(_.bind(function(){
        this.getChallenges()
      },this), 4000);
    },
    onGetChallenges:function(jsonText){
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

  return challengesView;

});