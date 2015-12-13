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
          end_type: 'tie',
          direction:['full'],
          message:'Both Players Tied with all Spaces Taken.'
        },
        {
          end_type: 'across',
          direction: ['right','left'],
          message:'Won with 4 Across.'
        },
        {
          end_type: 'stacked',
          direction: ['below'],
          message:'Won with 4 Stacked.'
        },
        {
          end_type: 'diagonal_right',
          direction: ['aboveRight','belowLeft'],
          message:'Won with 4 Diagonal Right.'
        },
        {
          end_type: 'diagonal_left',
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
      EventsChannel.on('game:end', this.stopTurnTimer, this);
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
        $.ajax({
          type: "GET",
          url: '/api/games/turn/id/'+this.get('id'),
          success: _.bind(this.onGetTurn, this)
        });
      }
      this.stopTurnTimer();
      this.startTurnTimer();
    },
    onGetTurn:function(jsonText){
      var obj = (typeof jsonText == 'string')? JSON.parse(jsonText) : jsonText;
      if(parseInt(obj.whose_turn) == this.get('playerId')){
        //switch turns
        this.set('turn', parseInt(obj.whose_turn));
        //get the data from the last guys move
        EventsChannel.trigger('getMove');
      }
    },
    startTurnTimer : function(){
      this.turnTimer = setTimeout(_.bind(function(){
        this.getTurn();
      },this), 3000);
    },
    stopTurnTimer : function(){
      clearTimeout(this.turnTimer);
    }

  });

  return  GameModel;


});
