define([
  'jquery',
  'underscore',
  'backbone',
  'events/Channel'
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

    initialize: function(){
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
    }

  });

  return  GameModel;


});
