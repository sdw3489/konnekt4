function init(){
  getChat(); // initializes the chat system
  getLoggedInUsers(); // grabs logged in users
  getChallenges(); // retrieves games current user has challenged other users
  getChallengers(); //retrieves games which the current user has been challenged in
}
function scrollBox(){ //auto scroll of box
  var objDiv = document.getElementById("chat-box");
  objDiv.scrollTop = objDiv.scrollHeight;
}


function getChat(){
  scrollBox();
  var theQuery='getChat=true&game_Id=0';
  $.ajax({
    type: "GET",
    url: '/app/controllers/userController.php',
    data: theQuery,
    success: function(jsonText) {
      var obj = eval(jsonText);
      var stuffForPage='';
      for(i in obj){
        stuffForPage+=obj[i].username+": "+obj[i].message+"<br>";
      }
      $('#chat-box').html(stuffForPage);
    }
  });
  setTimeout('getChat()', 2000);
}

function sendChat(){
  scrollBox();
  if(arguments[0]){
    theQuery='setChat=true&message='+arguments[0]+'&game_Id=0';
    var inputDiv = document.getElementById("chat-input").value="";
  }else{
    theQuery='getChat=true&game_Id=0';
  }
  $.ajax({
    type: "GET",
    url: '/app/controllers/userController.php',
    data: theQuery,
    success: function(jsonText) {
      var obj = eval(jsonText);
      var stuffForPage='';
      for(i in obj){
        stuffForPage+=obj[i].username+": "+obj[i].message+"<br />";
      }
      $('#chat-box').html(stuffForPage);
    }
  });
  if(!arguments[0]) setTimeout('sendChat()', 2000);
}

function getLoggedInUsers(){
  $.ajax({
    type: "GET",
    url: '/app/controllers/userController.php',
    data: 'getLoggedIn=true',
    success: function(jsonText) {
      var obj = eval(jsonText);
      var stuffForPage='';
      for(i in obj){
        stuffForPage+='<form class="user-form" action="/app/controllers/gameController.php" method="GET" onsubmit=""><input type="hidden" name="user_Id" value="'+obj[i].user_Id+'"/><input type="submit" id="btn_'+obj[i].username+'" name="challenge" value=" '+obj[i].username+'       "/> </form>';
        $('#usersLoggedIn').html(stuffForPage);
      }
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
      var stuffForPage='<ul>';
      for(i in obj){
        stuffForPage+="<li>You challenged "+obj[i].username+". <a href='/game/konnekt4.php?player="+userId+"&gameId="+obj[i].game_Id+"'>Game "+obj[i].game_Id+"</a></li>";
      }
      stuffForPage+='</ul>';
      if(stuffForPage != ''){
        $('#games-avail').html(stuffForPage);
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
      var stuffForPage='<ul>';
      for(i in obj){
        stuffForPage+="<li>"+obj[i].username+" challenged you. <a href='/game/konnekt4.php?player="+userId+"&gameId="+obj[i].game_Id+"'>Game "+obj[i].game_Id+"</a></li>";
      }
      stuffForPage+='</ul>';
      if(stuffForPage != ''){
        $('#games-avail2').html(stuffForPage);
      }else{
        $('#games-avail2').html("No Games Currently");
      }
    }
  });
  setTimeout('getChallengers()', 3000);
}