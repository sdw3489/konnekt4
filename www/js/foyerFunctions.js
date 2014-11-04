function init(){
  getChat(); // initializes the chat system
  getLoggedInUsers(); // grabs logged in users
  getChallenges(); // retrieves games current user has challenged other users
  getChallengers(); //retrieves games which the current user has been challenged in
}

function scrollBox(){ //auto scroll of box\
  var $objDiv = $(".js-chat");
  $objDiv[0].scrollTop = $objDiv[0].scrollHeight;
}


function getChat(){
  var theQuery='getChat=true&game_Id=0';
  $.ajax({
    type: "GET",
    url: '/app/controllers/userController.php',
    data: theQuery,
    success: function(jsonText) {
      var obj = eval(jsonText);
      var html='';
      for(i in obj){
        html+=obj[i].username+": "+obj[i].message+"<br>";
      }
      $('.js-chat').html(html);
      scrollBox();
    }
  });
  setTimeout('getChat()', 2000);
}

function sendChat(){
  if(arguments[0]){
    theQuery='setChat=true&message='+arguments[0]+'&game_Id=0';
    var inputDiv = document.getElementById("chat-input").value="";
  }
  $.ajax({
    type: "GET",
    url: '/app/controllers/userController.php',
    data: theQuery,
    success: function(jsonText) {
      var obj = eval(jsonText);
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
    url: '/app/controllers/userController.php',
    data: 'getLoggedIn=true',
    success: function(jsonText) {
      var html='';
      console.log(jsonText);
      if(jsonText !== ''){
        var obj = eval(jsonText);
          html+='<ul class="list-group">';
        for(i in obj){
          html+='<li class="list-group-item">';
          html+='<form class="user-form" action="/app/controllers/gameController.php" method="GET" onsubmit="">';
          html+='<input type="hidden" name="user_Id" value="'+obj[i].user_Id+'"/>';
          html+='<span class="glyphicon glyphicon-user"></span><span class="username">'+obj[i].username+'</span>';
          html+='<input type="submit" class="btn btn-primary btn-sm pull-right" name="challenge" value="Challenge"/>';
          html+='</form>';
          html+='</li>';
        }
          html+='</ul>';
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
      var obj = eval(jsonText);
      var html='<ul>';
      for(i in obj){
        html+="<li>You challenged "+obj[i].username+". <a href='/game/konnekt4.php?player="+userId+"&gameId="+obj[i].game_Id+"'>Game "+obj[i].game_Id+"</a></li>";
      }
      html+='</ul>';
      if(html != ''){
        $('#games-avail').html(html);
      }else{
        $('#games-avail').html("No Games Currently");
      }
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
      var obj = eval(jsonText);
      var html='<ul>';
      for(i in obj){
        html+="<li>"+obj[i].username+" challenged you. <a href='/game/konnekt4.php?player="+userId+"&gameId="+obj[i].game_Id+"'>Game "+obj[i].game_Id+"</a></li>";
      }
      html+='</ul>';
      if(html != ''){
        $('#games-avail2').html(html);
      }else{
        $('#games-avail2').html("No Games Currently");
      }
    }
  });
  setTimeout('getChallengers()', 3000);
}