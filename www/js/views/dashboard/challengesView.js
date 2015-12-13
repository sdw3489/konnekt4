define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/challengesTemplate.html',
  'events/channel'
], function($, _, Backbone, ChallengesTemplate, EventsChannel ){

  var ChallengesView = Backbone.View.extend({
    el:'.challenges-view',
    template:_.template(ChallengesTemplate),
    events: {},
    data:null,
    prevData:'',
    timer :null,

    initialize: function () {
      this.getChallenges();
      EventsChannel.on('challengeUser', this.getChallenges, this);
    },
    render: function (data) {
      return this.template(data);
    },
    getChallenges: function(){
      $.ajax({
        type: "GET",
        url: '/api/games/challenges/',
        success: _.bind(this.onGetChallenges, this),
        error: function(error){
          console.log(error);
        }
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(_.bind(function(){
        this.getChallenges()
      },this), 4000);
    },
    onGetChallenges:function(data){
      if(!_.isEqual(data, this.prevData)){
        EventsChannel.trigger('updateChallenges');
        this.prevData = data;
        this.$el.html('');
        if(data.status != false){
          for(i in data){
            this.addOne(data[i]);
          }
        }else{
          this.addOne({username:'', game_id:''});
        }
      }
    },
    addOne : function(data){
      this.$el.append(this.render(data));
    }
  });

  return ChallengesView;

});