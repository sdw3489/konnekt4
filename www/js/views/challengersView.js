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
    prevData:'',
    timer:null,

    initialize: function () {
      this.getChallengers();
    },
    render: function (data) {
      return this.template(data);
    },
    getChallengers: function(){
      $.ajax({
        type: "GET",
        url: '/game/getChallengers/',
        success: _.bind(this.onGetChallengers, this)
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(_.bind(function(){
        this.getChallengers()
      },this), 4000);
    },
    onGetChallengers:function(jsonText){
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

  return challengersView;

});