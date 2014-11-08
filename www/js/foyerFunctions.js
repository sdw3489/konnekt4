function init(){
  // getChat(); // initializes the chat system
  getLoggedInUsers(); // grabs logged in users
  // getChallenges(); // retrieves games current user has challenged other users
  // getChallengers(); //retrieves games which the current user has been challenged in
}

function scrollBox(){ //auto scroll of box\
  var $objDiv = $(".js-chat");
  $objDiv[0].scrollTop = $objDiv[0].scrollHeight;
}


function getChat(){
  var theQuery='getChat=true';
  $.ajax({
    type: "GET",
    url: '/app/controllers/userController.php',
    data: theQuery,
    success: function(jsonText) {
      var obj = JSON.parse(jsonText);
      var html='';
      for(i in obj){
        html+=obj[i].username+": "+obj[i].message+"<br>";
      }
      $('.js-chat').html(html);
      scrollBox();
    }
  });
  setTimeout('getChat()', 1500);
}

function sendChat(){
  if(arguments[0]){
    theQuery='setChat=true&message='+arguments[0];
    var inputDiv = document.getElementById("chat-input").value="";
  }
  $.ajax({
    type: "GET",
    url: '/app/controllers/userController.php',
    data: theQuery,
    success: function(jsonText) {
      var obj = JSON.parse(jsonText);
      var html='';
      for(i in obj){
        html+=obj[i].username+": "+obj[i].message+"<br />";
      }
      $('.js-chat').html(html);
      scrollBox();
    }
  });
}

function getLoggedInUsers(){
  $.ajax({
    type: "GET",
    url: '/user/getLoggedIn/',
    success: function(jsonText) {
      var html='';
      if(jsonText !== ''){
        var obj = JSON.parse(jsonText);
        for(i in obj){
          html+='<li class="list-group-item">';
          html+='<form class="user-form" action="/app/controllers/gameController.php" method="GET" onsubmit="">';
          html+='<input type="hidden" name="user_Id" value="'+obj[i].user_Id+'"/>';
          html+='<span class="glyphicon glyphicon-user"></span><span class="username">'+obj[i].username+'</span>';
          html+='<input type="submit" class="btn btn-primary btn-sm pull-right" name="challenge" value="Challenge"/>';
          html+='</form>';
          html+='</li>';
        }
      }
      $('.js-logged-in-users').html(html);
    }
  });
  setTimeout('getLoggedInUsers()', 5000);
}



function getChallenges(){
  $.ajax({
    type: "GET",
    url: '/app/controllers/gameController.php',
    data: 'getChallenges=true',
    success: function(jsonText){
      var html='';
      if(jsonText != 'null'){
        var obj = JSON.parse(jsonText);
        for(i in obj){
          html+='<li class="list-group-item clearfix">You challenged '+obj[i].username+'! <a href="/game/konnekt4.php?player='+userId+'&gameId='+obj[i].game_Id+'" class="btn btn-sm btn-success pull-right"><span class="glyphicon glyphicon-play"></span> Play Game '+obj[i].game_Id+'</a></li>';
        }
      }else{
        html+='<li class="list-group-item">You haven\'t challenged anyone.</li>';
      }
      $('#games-avail').html(html);
    }
  });
  setTimeout('getChallenges()', 4000);
}

function getChallengers(){
  $.ajax({
    type: "GET",
    url: '/app/controllers/gameController.php',
    data: 'getChallengers=true',
    success: function(jsonText){
      var html='';
      if(jsonText != 'null'){
        var obj = JSON.parse(jsonText);
        for(i in obj){
          html+='<li class="list-group-item clearfix">'+obj[i].username+' challenged you! <a href="/game/konnekt4.php?player='+userId+'&gameId='+obj[i].game_Id+'" class="btn btn-sm btn-success pull-right"><span class="glyphicon glyphicon-play"></span> Play Game '+obj[i].game_Id+'</a></li>';
        }
      }else{
        html+='<li class="list-group-item">Noone has challenged you.</li>';
      }
      $('#games-avail2').html(html);
    }
  });
  setTimeout('getChallengers()', 4000);
}