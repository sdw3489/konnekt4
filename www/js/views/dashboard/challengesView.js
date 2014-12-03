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
        url: '/game/getChallenges/1',
        success: _.bind(this.onGetChallenges, this)
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(_.bind(function(){
        this.getChallenges()
      },this), 4000);
    },
    onGetChallenges:function(jsonText){
      this.data = JSON.parse(jsonText);
      if(!_.isEqual(this.data, this.prevData)){
        EventsChannel.trigger('updateChallenges');
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

  return ChallengesView;

});