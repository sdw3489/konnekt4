define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/ChatTemplate.html',
], function($, _, Backbone, ChatTemplate ){

  var chatView = Backbone.View.extend({
    el: '.chat-container',
    template: _.template(ChatTemplate),
    events: {
      'change .chat-input' : 'sendChat'
    },
    initialize: function () {
      this.render();
      this.$chatBox = this.$el.find('.js-chat');
      this.getChat();
    },
    render: function () {
      this.$el.html(this.template);
      return this;
    },
    scrollBox: function(){
      var $objDiv = $(".js-chat");
      $objDiv[0].scrollTop = $objDiv[0].scrollHeight;
    },
    getChat: function(){
      $.ajax({
        type: "GET",
        url: '/chat/getChat/',
        success: $.proxy(this.onGetChat, this)
      });
      setTimeout(_.bind(function(){
        this.getChat();
      },this), 1500);
    },
    onGetChat:function(jsonText) {
      var obj = JSON.parse(jsonText);
      var html='';
      for(i in obj){
        html+=obj[i].username+": "+obj[i].message+"<br>";
      }
      this.$chatBox.html(html);
      this.scrollBox();
    },
    sendChat: function(event){
      var val = event.target.value;
      if(val){
        $(".chat-input").val("");
      }
      $.ajax({
        type: "POST",
        url: '/chat/sendChat/',
        data: { message :val },
        success: _.bind(this.onSendChat, this)
      });
    },
    onSendChat: function(jsonText) {
      var obj = JSON.parse(jsonText);
      var html='';
      for(i in obj){
        html+=obj[i].username+": "+obj[i].message+"<br />";
      }
      this.$chatBox.html(html);
      this.scrollBox();
    }
  });

  return chatView;

});