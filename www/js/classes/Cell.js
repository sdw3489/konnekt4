define([
  'jquery',
  'underscore',
  'backbone',
  'events/channel',
  'utils/utils',
], function($, _, Backbone, EventsChannel, utils ){

  /***********************************************
   * Class: Cell
   * Description:  This will create a cell object
   * (board square) that you can reference from the game
   * Arguments:
   *    size - tell the object it's width & height
   **************************************************/
  var Cell = Backbone.View.extend({

    el: function(){
      this.x = this.model.col * this.model.size;
      this.y = this.model.row * this.model.size;
      return utils.createSVG('g', {
        'id' : this.model.id,
        'transform' : "translate("+(this.x+(this.model.size/2))+","+(this.y+(this.model.size/2))+")",
      });
    },
    events: {
      'click' : 'onCellClick'
    },

    initialize : function(){
      //initialize the other instance vars
      this.occupied = null;

      //create the cell svg object
      this.render();
    },

     //create it
    render: function() {
      // create the svg cell item.
      var circ = utils.createSVG('circle', {
        'r' : '30',
        'fill' : 'white'
      });

      this.$el.append(circ);

      // return this object to be stored in a variable
      return this;
    },

    onCellClick : function(e){
      EventsChannel.trigger('Cell:clicked', {col:this.model.col});
    },

    //get my center x
    getCenterX: function(){
      return (this.x + (this.model.size/2));
    },

    //get my center y
    getCenterY: function(){
      return (this.y + (this.model.size/2));
    }


  });

  return Cell;

});