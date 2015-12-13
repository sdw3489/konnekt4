define([
  'jquery',
  'underscore',
  'backbone',
  'dv/chatBoxView',
  'text!templates/chatTemplate.html'
], function($, _, Backbone, ChatBoxView, ChatTemplate ){

  var ChatView = Backbone.View.extend({
    el: '.chat-container',
    template: _.template(ChatTemplate),
    data:null,
    prevData:'',
    timer:null,
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
      this.$chatBox[0].scrollTop = this.$chatBox[0].scrollHeight;
    },
    getChat: function(){
      $.ajax({
        type: "GET",
        url: '/api/chats/latest/',
        success: $.proxy(this.onGetChat, this)
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(_.bind(function(){
        this.getChat();
      },this), 2000);
    },
    onGetChat:function(jsonText) {
      this.data = (typeof jsonText == 'string')? JSON.parse(jsonText) : jsonText;
      if(!_.isEqual(this.data, this.prevData)){
        this.prevData = this.data;
        this.$chatBox.html('');
        if(this.data.status != false){
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
        url: '/api/chats/',
        data: { message :val },
        success: _.bind(this.onGetChat, this)
      });
    }
  });

  return ChatView;

});