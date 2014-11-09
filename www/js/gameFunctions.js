var xhtmlns = "http://www.w3.org/1999/xhtml";
var svgns = "http://www.w3.org/2000/svg";
var BOARDX = 0;       //starting pos of board
var BOARDY = 0;       //look above
var boardArr = new Array();   //2d array [row][col]
var pieceArr = new Array();   //2d array [player][piece] (player is either 0 or 1)
var directionArr = [
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
];
var BOARDWIDTH = 7;       //how many squares across
var BOARDHEIGHT = 6;      //how many squares down
//the problem of dragging....
var myX;            //hold my last pos.
var myY;            //hold my last pos.
var numPieces=0;          //hold the number of pieces

function gameInit(){
  ajax_utility("/game/start/"+gameId, gameInfo);
}
function gameInfo(data){
  var gameData = JSON.parse(data),
      game = gameData[0];
  turn = game.whoseTurn;

  //compare the session name to the player name to find out my playerId;
  playerId = player2Id = null;
  if(player == game.player0_Id){
    player2 = game.player1_Id;
    playerId = 0;
    player2Id = 1;
  }else{
    player2 = game.player0_Id;
    playerId = 1;
    player2Id = 0;
  }

  ajax_getUserInfo("/user/getUserInfo/"+player, playerId);
  ajax_getUserInfo("/user/getUserInfo/"+player2, player2Id);

  //start building the game (board and piece)
  createBoard();
}

function userInfo(data, whichUser){
   var userData = JSON.parse(data)[0],
    username = userData.username;

  if(whichUser === playerId){
    $('#youPlayer').html('You are: '+username);
  }else{
    $('#opponentPlayer').html('Opponent is: '+username);
  }

  //put the player in the text
  if(playerId === turn){
    $("#turnInfo").html("Your Turn")
      .addClass('list-group-item-success')
      .removeClass('list-group-item-danger');
  }else{
    $("#turnInfo").html("Opponents Turn")
      .addClass('list-group-item-danger')
      .removeClass('list-group-item-success');
  }
}

function createBoard(){
  //create a parent to stick board in...
  var gEle=document.createElementNS(svgns,'g');

  gEle.setAttributeNS(null,'transform','translate('+BOARDX+','+BOARDY+')');

  gEle.setAttributeNS(null,"id","game_1");

  gEle.setAttributeNS(null,'stroke','blue');
  //stick g on board

  document.getElementsByTagName('svg')[0].insertBefore(gEle,document.getElementsByTagName('svg')[0].childNodes[4]);

  //create the board...
  for(i=0;i<BOARDHEIGHT;i++){//rows i
    boardArr[i]=new Array();
    for(j=0;j<BOARDWIDTH;j++){//cols j
      boardArr[i][j]=new Cell(document.getElementById("game_1"),'cell_'+j+i,75,j,i);
    }
  }

  if(turn!=playerId){
    ajax_utility('/game/getTurn/'+gameId, onGetTurn);
  }else{
    setTimeout(function(){
      ajax_utility('/game/getTurn/'+gameId, onGetTurn);
    }, 3000);
  }
}

function onGetTurn(jsonText){
  var obj = JSON.parse(jsonText)[0];
  if(obj.whoseTurn == playerId){
    //switch turns
    turn=obj.whoseTurn;
    $("#turnInfo").html("Your Turn").addClass('list-group-item-success').removeClass('list-group-item-danger');
    //get the data from the last guys move
    ajax_utility('/game/getMove/'+gameId, onGetMove);
  }
  setTimeout(function(){
    ajax_utility('/game/getTurn/'+gameId, onGetTurn);
  }, 3000);
}

function onGetMove(jsonText){
  var obj = JSON.parse(jsonText);
  //shortcuts
  var ppiece=obj[0]['player'+Math.abs(playerId-1)+'_pieceID'];
  var pbR=obj[0]['player'+Math.abs(playerId-1)+'_boardR'];
  var pbC=obj[0]['player'+Math.abs(playerId-1)+'_boardC'];

  if(pbC != null || pbR != null){
    var temp = new Piece("game_"+gameId,Math.abs(playerId-1),pbR,pbC,'Checker',1);
  }
}

//************************ NEW FUNCTION ***********************/
function placePiece(col)
{
  //checks from the bottom of the board up.
  for(var row=boardArr.length-1; row >= 0; row--)
  {
    //get the target cell based on the col passed into the function and the i variable which counts bottom up
    var targetSpot = boardArr[row][col];
    //if the target drop spot cell is not already occupied
    if(targetSpot.occupied === null)
    {
      //if its the current players turn add a new piece at the target spot
      if(playerId == turn){
        numPieces++;
        var piece = new Piece('game_'+gameId,playerId,row,col,'Checker',numPieces);
        ajax_utility('/game/changeBoard/'+gameId+'/'+playerId+'/'+targetSpot.id+'/'+row+'/'+col, onChangeBoard);
        changeTurn();
      }else{// if its not your turn throw a not your turn error at the top of the game board
        var hit=false;
        nytwarning();
      }
      break;
    }
  }
}
function onChangeBoard(){}


///////////////////////////////Utilities////////////////////////////////////////
////get Piece/////
//  get the piece (object) from the id and return it...
////////////////
function getPiece(which){
  return pieceArr[parseInt(which.substr((which.search(/\_/)+1),1))][parseInt(which.substring((which.search(/\|/)+1),which.length))];
}

////get Transform/////
//  look at the id of the piece sent in and work on it's transform
////////////////
function getTransform(which){
  var hold=document.getElementById(which).getAttributeNS(null,'transform');
  var retVal=new Array();
  retVal[0]=hold.substring((hold.search(/\(/) + 1),hold.search(/,/));     //x value
  retVal[1]=hold.substring((hold.search(/,/) + 1),hold.search(/\)/));;    //y value
  return retVal;
}

////set Transform/////
//  look at the id, x, y of the piece sent in and set it's translate
////////////////
function setTransform(which,x,y){
  document.getElementById(which).setAttributeNS(null,'transform','translate('+x+','+y+')');
}

////change turn////
//  change who's turn it is
//////////////////
function changeTurn(){
  //locally, for the name color
  if(turn == 0){
    turn=1;
  }else{
    turn=0;
  }
  //how about for the server (and other player)?
  //send JSON message to server, have both clients monitor server to know who's turn it is...
   if(playerId === turn){
    $("#turnInfo").html("Your Turn")
      .addClass('list-group-item-success')
      .removeClass('list-group-item-danger');
  }else{
    $("#turnInfo").html("Opponents Turn")
      .addClass('list-group-item-danger')
      .removeClass('list-group-item-success');
  }
  ajax_utility('/game/changeTurn/'+gameId, onChangeServerTurn);
}
function onChangeServerTurn(){}

/////////////////////////////////Messages to user/////////////////////////////////
////nytwarning (not your turn)/////
//  tell player it isn't his turn!
////////////////
function nytwarning(){
  var $alert = $(".js-turn-alert");
  if(!$alert.is(':visible')){
    $alert.slideDown();
    setTimeout('nytwarning()',3000);
  }else{
    $alert.slideUp();
  }
}

function gameEnd(player, msg){
  $('.js-game-end-msg').html("<p>Player "+player+" "+ msg+"</p>");
  $('.js-game-end-modal').modal();
}