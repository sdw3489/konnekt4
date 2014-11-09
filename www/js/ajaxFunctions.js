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

function ajax_getTurn(){
  if(turn!=playerId){
    $.ajax({
      type: "GET",
      url: arguments[0],
      success: arguments[1]
    });
  }
  setTimeout(function(){
    ajax_getTurn('/game/getTurn/'+gameId, onGetTurn);
  }, 3000);
}