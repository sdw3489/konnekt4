define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/userTemplate.html',
  'events/channel',
  'module',
], function($, _, Backbone, UserTemplate, EventsChannel, module ){

  var UserView = Backbone.View.extend({
    tagName:'tr',
    template: _.template(UserTemplate),
    events: {
      'click .js-user-action' : 'connectUser'
    },

    initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.getConnections();
    },
    attributes : function () {
      // Return model data
      return {
        class: _.bind(this.getClass, this)
      };
    },
    getClass : function(){
      var user = this.model.get('user'),
          user_id = this.model.get('user_id'),
          isCurrent = (user.id == user_id) ?  true : false,
          isConnection = false,
          status = null,
          initiator = false;

      this.model.set({
        'isCurrent': isCurrent,
        'isConnection': isConnection,
        'initiator': initiator,
        'status': status
      });

      if(!isCurrent){
        for(var i=0; i<=user.connections.length-1; i++){
          if(user.connections[i].user_id == user_id || user.connections[i].connection_id == user_id) {
            isConnection = true;
            status = user.connections[i].status;
            initiator = (user.connections[i].initiator_id == user_id)? true : false;
            this.model.set({
              'isConnection': isConnection,
              'initiator': initiator,
              'status': status
            });
            break;
          }
        }
      }

      if(isCurrent){
        return 'active';
      }else if(isConnection == true && status == 'connected'){
        return 'info';
      }else if(isConnection == true && status == 'declined' && initiator){
        return 'danger';
      }
    },
    setClass: function(which){
      if(which == 'accept' || which == 'connected'){
        this.$el.attr('class', 'info');
      }else if(which == 'declined'){
        this.$el.attr('class', 'danger');
      }else{
        this.$el.attr('class', '');
      }
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    getConnections : function(){
      $.ajax({
        type: "GET",
        url: '/user/getConnections/'+this.model.get('user').id,
        success: _.bind(this.onGetConnections, this)
      });
      clearTimeout(this.timer);
      this.timer=setTimeout(_.bind(function(){
        this.getConnections()
      },this), 10000);
    },
    onGetConnections : function(jsonText) {
      var data = JSON.parse(jsonText);
      if(data != null){
        if(data.status != this.model.get('status')){
          this.model.set({
            'isConnection':true,
            'initiator': (data.initiator_id == this.model.get('user_id'))? true : false,
            'status':data.status
          });
          this.setClass(data.status);
        }
      }else if(data == null && this.model.get('isCurrent') == false){
        this.model.set({
          'isConnection':false,
          'initiator':false,
          'status':null
        });
        this.setClass('removed');
      }
    },
    connectUser: function(event){
      event.preventDefault();
      var $btn = $(event.currentTarget),
          id = $btn.data('id'),
          type = $btn.data('connection-type');

      $btn.button('loading');

      $.ajax({
        type: "POST",
        url: '/user/connect/'+id,
        data:{
          'type': type
        },
        success: _.bind(function(data){
          setTimeout(_.bind(function(){
            EventsChannel.trigger('connection:action');
            if(type == 'connect'){
              this.model.set({
                'isConnection': true,
                'initiator': true,
                'status': 'sent'
              });
            }else if(type == 'remove'){
              this.model.set({
                'isConnection': false,
                'status': ''
              });
              this.setClass(type);
            }else if(type == 'accept'){
              this.model.set({
                'status': 'connected'
              });
              this.setClass(type);
            }else if(type == 'decline'){
              this.model.set({
                'status': 'declined'
              });
            }
          },this),1000);
        }, this)
      });
    }

  });

  return UserView;

});