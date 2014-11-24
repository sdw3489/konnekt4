define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel'
], function($, _, Backbone, EventsChannel ){

  var GameModel = Backbone.Model.extend({

    defaults:{
      xhtmlns : "http://www.w3.org/1999/xhtml",
      svgns : "http://www.w3.org/2000/svg",
      boardArr : [],   //2d array [row][col]
      pieceArr : [],   //2d array [player][piece] (player is either 0 or 1)
      directionArr : [
        {
          direction: ['right','left'],
          message:'Won with 4 Across.'
        },
        {
          direction: ['below'],
          message:'Won with 4 Stacked.'
        },
        {
          direction: ['aboveRight','belowLeft'],
          message:'Won with 4 Diagonal Right.'
        },
        {
          direction: ['aboveLeft','belowRight'],
          message:'Won with 4 Diagonal Left.'
        }
      ],
      BOARDWIDTH : 7,       //how many squares across
      BOARDHEIGHT : 6,     //how many squares down
      numPieces:0          //hold the number of pieces
    },
    turnTimer : null,

    initialize: function(){
      this.getTurn();
      this.on("change", function() {
        if (this.hasChanged("turn")) {}
      });
    },
    changeTurn:function(){
      if(this.get('turn') === 0){
        this.set('turn', 1);
      }else{
        this.set('turn', 0);
      }
    },
    getTurn: function(){
      if(this.get('turn')!=this.get('playerId')){
        this.ajax_utility('/game/getTurn/'+this.get('game_id'), this.onGetTurn);
      }
      clearTimeout(this.turnTimer);
      this.turnTimer = setTimeout(_.bind(function(){
        this.getTurn();
      },this), 3000);
    },
    onGetTurn:function(jsonText){
      var obj = JSON.parse(jsonText)[0];
      if(obj.whose_turn == this.get('playerId')){
        //switch turns
        this.set('turn', obj.whose_turn);
        //get the data from the last guys move
        EventsChannel.trigger('getMove');
      }
    },
    ajax_utility:function(){
      $.ajax({
        type: "GET",
        url: arguments[0],
        success: _.bind(arguments[1], this)
      });
    }

  });

  return  GameModel;


});
