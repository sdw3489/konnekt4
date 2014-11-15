define([
  'jquery',
  'underscore',
  'backbone',
  'views/chatBoxView',
  'text!templates/ChatTemplate.html',
], function($, _, Backbone, ChatBoxView, ChatTemplate ){

  var ChatView = Backbone.View.extend({
    el: '.chat-container',
    template: _.template(ChatTemplate),
    data:null,
    prevData:'',
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
      },this), 2000);
    },
    onGetChat:function(jsonText) {
      this.data = JSON.parse(jsonText);
      if(!_.isEqual(this.data, this.prevData)){
        this.prevData = this.data;
        this.$chatBox.html('');
        if(this.data != null){
          for(i in this.data){
            var view = new ChatBoxView();
            this.$chatBox.append(view.render(this.data[i]).el);
          }
        }
      }
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
        success: _.bind(this.onGetChat, this)
      });
    }
  });

  return ChatView;

});