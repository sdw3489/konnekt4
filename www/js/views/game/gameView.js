define([
  'jquery',
  'underscore',
  'backbone',
  'models/gameModel',
  'classes/Cell',
  'classes/Piece',
  'gv/gamePlayerView',
  'gv/gameTurnView',
  'events/channel',
  'module'
], function($, _, Backbone, GameModel, Cell, Piece, GamePlayerView, GameTurnView, EventsChannel, module){

  var GameView = Backbone.View.extend({

    game : module.config(),
    turnTimer : null,
    $alert : $('.js-turn-alert'),
    $infoView : $('.js-info-view'),

    initialize: function () {

      this.model = new GameModel({
        game_Id         : this.game.game_Id,
        turn            : this.game.whoseTurn,
        playerId        : this.game.current_player.playerId,
        player2Id       : this.game.opponent_player.playerId,
        current_player  : this.game.current_player.name,
        opponent_player : this.game.opponent_player.name,
        current_Id      : this.game.current_player.id,
        opponent_Id     : this.game.opponent_player.id,
        players         : this.game.players
      });

      _.each(this.model.get('players'), _.bind(function(player){
        var v = new GamePlayerView({
          model:player
        });
        this.$infoView.append(v.render().el);
      }, this));

      var turnView = new GameTurnView({
        model:this.model
      });
      this.$infoView.append(turnView.render().el);

      this.render();
    },
    render: function(){
      //create a parent to stick board in...
      var gEle=document.createElementNS(this.model.get('svgns'),'g');
      // gEle.setAttributeNS(null,'transform','translate('+this.BOARDX+','+this.BOARDY+')');
      gEle.setAttributeNS(null,"id","game_1");
      gEle.setAttributeNS(null,'stroke','blue');
      //stick g on board

      document.getElementsByTagName('svg')[0].insertBefore(gEle,document.getElementsByTagName('svg')[0].childNodes[4]);

      //create the board...
      for(i=0;i<this.model.get('BOARDHEIGHT');i++){//rows i
        this.model.get('boardArr')[i]=new Array();
        for(j=0;j<this.model.get('BOARDWIDTH');j++){//cols j
          this.model.get('boardArr')[i][j]=new Cell(document.getElementById("game_1"),'cell_'+j+i,75,j,i,this);
        }
      }

      this.ajax_getTurn('/game/getTurn/'+this.model.get('game_Id'), this.onGetTurn);
    },
    ajax_getTurn: function(){
      if(this.model.get('turn')!=this.model.get('playerId')){
        $.ajax({
          type: "GET",
          url: arguments[0],
          success: _.bind(arguments[1], this)
        });
      }
      clearTimeout(this.turnTimer);
      this.turnTimer = setTimeout(_.bind(function(){
        this.ajax_getTurn('/game/getTurn/'+this.model.get('game_Id'), this.onGetTurn);
      },this), 3000);
    },
    onGetTurn:function(jsonText){
      var obj = JSON.parse(jsonText)[0];
      if(obj.whoseTurn == this.model.get('playerId')){
        //switch turns
        this.model.set('turn', obj.whoseTurn);
        //get the data from the last guys move
        $.ajax({
          type: "GET",
          url: '/game/getMove/'+this.model.get('game_Id'),
          success: _.bind(this.onGetMove, this)
        });
      }
    },
    onGetMove: function(jsonText){
      var obj = JSON.parse(jsonText);
      //shortcuts
      var ppiece=obj[0]['player'+Math.abs(this.model.get('playerId')-1)+'_pieceID'];
      var pbR=obj[0]['player'+Math.abs(this.model.get('playerId')-1)+'_boardR'];
      var pbC=obj[0]['player'+Math.abs(this.model.get('playerId')-1)+'_boardC'];

      if(pbC != null || pbR != null){
        var temp = new Piece("game_"+this.model.get('game_Id'),Math.abs(this.model.get('playerId')-1),pbR,pbC,this.model.get('numPieces'), this);
      }

    },


    //************************ NEW FUNCTION ***********************/
    placePiece: function(col){
      //checks from the bottom of the board up.
      for(var row=this.model.get('boardArr').length-1; row >= 0; row--){
        //get the target cell based on the col passed into the function and the i variable which counts bottom up
        var targetSpot = this.model.get('boardArr')[row][col];
        //if the target drop spot cell is not already occupied
        if(targetSpot.occupied === null)
        {
          //if its the current players turn add a new piece at the target spot
          if(this.model.get('playerId') == this.model.get('turn')){
            this.model.set('numPieces', this.model.get('numPieces')+1);
            var piece = new Piece('game_'+this.model.get('game_Id'),this.model.get('playerId'),row,col,this.model.get('numPieces'), this);

            this.ajax_utility('/game/changeBoard/'+this.model.get('game_Id')+'/'+this.model.get('playerId')+'/'+targetSpot.id+'/'+row+'/'+col, this.onChangeBoard);
            this.ajax_utility('/game/changeTurn/'+this.model.get('game_Id'), this.onChangeServerTurn);
            this.model.changeTurn();

          }else{// if its not your turn throw a not your turn error at the top of the game board
            var hit=false;
            this.turnWarning();
          }
          break;
        }
      }

    },
    onChangeBoard: function(){},
    onChangeServerTurn: function(){},

    ///////////////////////////////Utilities////////////////////////////////////////
    ////get Piece/////
    //  get the piece (object) from the id and return it...
    ////////////////
    getPiece: function(which){
      return this.model.get('pieceArr')[parseInt(which.substr((which.search(/\_/)+1),1))][parseInt(which.substring((which.search(/\|/)+1),which.length))];
    },

    ////get Transform/////
    //  look at the id of the piece sent in and work on it's transform
    ////////////////
    getTransform: function(which){
      var hold=document.getElementById(which).getAttributeNS(null,'transform');
      var retVal=new Array();
      retVal[0]=hold.substring((hold.search(/\(/) + 1),hold.search(/,/));     //x value
      retVal[1]=hold.substring((hold.search(/,/) + 1),hold.search(/\)/));;    //y value
      return retVal;
    },

    ////set Transform/////
    //  look at the id, x, y of the piece sent in and set it's translate
    ////////////////
    setTransform: function(which,x,y){
      document.getElementById(which).setAttributeNS(null,'transform','translate('+x+','+y+')');
    },

    /////////////////////////////////Messages to user/////////////////////////////////
    ////nytwarning (not your turn)/////
    //  tell player it isn't his turn!
    ////////////////
    turnWarning: function(){
      if(!this.$alert.is(':visible')){
        this.$alert.slideDown();
        setTimeout(_.bind(function(){
          this.turnWarning();
        },this),3000);
      }else{
        this.$alert.slideUp();
      }
    },

    gameEnd: function(data){
      $('.js-game-end-msg').html("<p>Player "+data.player+" "+data.msg+"</p>");
      $('.js-game-end-modal').modal();
    },

    ajax_utility:function(){
      $.ajax({
        type: "GET",
        url: arguments[0],
        success: _.bind(arguments[1], this)
      });
    }


  });

  return GameView;

});