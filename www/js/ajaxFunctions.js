//this is my starter call
//goes out and gets all pertinant information about the game (FOR ME)
function ajax_getInfo(whatURL,whatFUNCT,whatVALUE){
  $.ajax({
    type: "GET",
    url: whatURL,
    data: whatFUNCT+"="+whatVALUE,
    success: gameInfo
  });
}

function ajax_changeServerTurn(whatURL,whatFUNCT,whatVALUE){
  $.ajax({
    type: "GET",
    url: whatURL,
    data: whatFUNCT+"="+whatVALUE,
    success: function(){
    }
  });
}


function ajax_changeBoard(whatURL,pieceId,boardR,boardC,whatFUNCT,whatVALUE){
  $.ajax({
    type: "GET",
    url: whatURL,
    data: whatFUNCT+"="+whatVALUE+"&pieceId="+pieceId+"&boardR="+boardR+"&boardC="+boardC+"&playerId="+playerId,
    success: function(){
    }
  });
}

function ajax_checkTurn(whatURL,whatFUNCT,whatVALUE){ //good to also check for new chat!
  if(turn!=playerId){
    $.ajax({
      type: "GET",
      url: whatURL,
      data: whatFUNCT+"="+whatVALUE,
      success: function(jsonText){
        var obj = JSON.parse(jsonText)[0];
        if(obj.whoseTurn == playerId){
          //switch turns
          turn=obj.whoseTurn;
          $("#turnInfo").html("Your Turn").addClass('list-group-item-success').removeClass('list-group-item-danger');
          //get the data from the last guys move
          ajax_getMove('/app/controllers/gameController.php','getMove',gameId);
        }
      }
    });
  }
  setTimeout("ajax_checkTurn('/app/controllers/gameController.php','checkTurn',"+gameId+")",3000);
}

function ajax_getMove(whatURL,whatFUNCT,whatVALUE){
  $.ajax({
    type: "GET",
    url: whatURL,
    data: whatFUNCT+"="+whatVALUE+"&playerId="+playerId,
    success: function(jsonText){

      var obj = JSON.parse(jsonText);
      //shortcuts
      var ppiece=obj[0]['player'+Math.abs(playerId-1)+'_pieceID'];
      var pbR=obj[0]['player'+Math.abs(playerId-1)+'_boardR'];
      var pbC=obj[0]['player'+Math.abs(playerId-1)+'_boardC'];

      var temp = new Piece('game_'+gameId,Math.abs(playerId-1),pbR,pbC,'Checker',1);

    /*
      var obj = JSON.parse(jsonText);
      //shortcuts
      var ppiece=obj[0]['player'+Math.abs(playerId-1)+'_pieceID'];
      var pbi=obj[0]['player'+Math.abs(playerId-1)+'_boardI'];
      var pbj=obj[0]['player'+Math.abs(playerId-1)+'_boardJ'];

      //make the other guys piece move to the location
      //first, clear the other guy's cell
      var toMove=getPiece(ppiece);
      toMove.current_cell.notOccupied();
      //now, actually move it!
      var x=boardArr[pbi][pbj].getCenterX();
      var y=boardArr[pbi][pbj].getCenterY();
      setTransform(ppiece,x,y);

      //now, for me, make the new cell occupied!
      //Piece.prototype.changeCell = function(newCell,row,col){
      getPiece(ppiece).changeCell('cell_'+pbi+pbj,pbi,pbj);

      //change my piece to be a king if at end of board... (and I'm not already a king)
      if(((playerId == 0 && pbi==0) || (playerId==1 && pbi==7)) && !getPiece(ppiece).object.isKing ){
        getPiece(ppiece).kingMe();
      }
      */

    }
  });
}

function ajax_getUserInfo(){
  var userGameId = arguments[1];
  $.ajax({
    type: "GET",
    url: arguments[0],
    success: function(data){
      userInfo(data, userGameId);
    }
  });
}

function ajax_utility(){
  $.ajax({
    type: "GET",
    url: arguments[0],
    success: arguments[1]
  });
}