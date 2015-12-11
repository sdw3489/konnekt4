define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel'
], function($, _, Backbone, EventsChannel ){

  var _templateView = Backbone.View.extend({

    el: '.js-notifications',
    template: _.template("<%= notifications %>"),
    timer: null,
    data: null,
    prevData: null,

    initialize: function () {
      this.getNotifications();
      EventsChannel.on('connection:action', this.getNotifications, this);
    },
    getNotifications: function(){
      $.ajax({
        type: "GET",
        url: '/api/users/notifications/',
        success: _.bind(this.onGetNotifications, this)
      });
      clearTimeout(this.timer);
      this.timer=setTimeout(_.bind(function(){
        this.getNotifications()
      },this), 10000);
    },
    onGetNotifications: function(jsonText){
      this.data = (typeof jsonText == 'string')? JSON.parse(jsonText) : jsonText;
      if(!_.isEqual(this.data, this.prevData)){
        this.prevData = this.data;
        this.render(this.data);
      }
    },
    render: function (data) {
      this.$el.html(this.template(data));
      return this;
    }
  });

  return _templateView;

});