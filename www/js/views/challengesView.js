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
    prevData:'',

    initialize: function () {
      this.getChallenges();
    },
    render: function (data) {
      return this.template(data);
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
      if(!_.isEqual(this.data, this.prevData)){
        this.prevData = this.data;
        this.$el.html('');
        if(this.data != null){
          for(i in this.data){
            this.addOne(this.data[i]);
          }
        }else{
          this.addOne({username:'', game_Id:''});
        }
      }
    },
    addOne : function(data){
      this.$el.append(this.render(data));
    }
  });

  return challengesView;

});