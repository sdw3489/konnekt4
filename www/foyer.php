<?php
session_start();
	if(isset($_SESSION['user_Id'])){
		$content= "<div class='box' id='welcome'><h2>Welcome back ".$_SESSION['username']."!</h2>";
		$content.= "<a href='userController.php?logout'>Logout</a></div>";
	}else{
		header("Location:login.php");
	}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Foyer</title>
	<link type="text/css" rel="stylesheet" href="styles.css" />
	<!--<script type="text/javascript" src="json-minified.js"></script>-->
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<!--<script type="text/javascript" src="foyerScripts.js"></script>-->
	<script language="javascript"  type="text/javascript">

	function init(){
		sendChat(); // initializes the chat system
		getLoggedInUsers(); // grabs logged in users
		getChallenges(); // retrieves games current user has challenged other users
		getChallengers();	//retrieves games which the current user has been challenged in
	}
	function scrollBox(){ //auto scroll of box
		var objDiv = document.getElementById("chat-box");
		objDiv.scrollTop = objDiv.scrollHeight;
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
			url: 'userController.php',
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
			url: 'userController.php',
			data: 'getLoggedIn=true',
			success: function(jsonText) {
				var obj = eval(jsonText);
				var stuffForPage='';
				for(i in obj){
					stuffForPage+='<form class="user-form" action="gameController.php" method="GET" onsubmit=""><input type="hidden" name="user_Id" value="'+obj[i].user_Id+'"/><input type="submit" id="btn_'+obj[i].username+'" name="challenge" value=" '+obj[i].username+'       "/>	</form>';
					$('#usersLoggedIn').html(stuffForPage);
				}
			}
		});
		setTimeout('getLoggedInUsers()', 5000);
	}

	function getChallenges(){
		$.ajax({
			type: "GET",
			url: 'gameController.php',
			data: 'getChallenges=true',
			success: function(jsonText){
				var obj = eval(jsonText);
				var stuffForPage='<ul>';
				for(i in obj){
					stuffForPage+="<li>You challenged "+obj[i].username+". <a href='game/konnekt4.php?player="+<?php echo $_SESSION['user_Id']; ?>+"&gameId="+obj[i].game_Id+"'>Game "+obj[i].game_Id+"</a></li>";
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
			url: 'gameController.php',
			data: 'getChallengers=true',
			success: function(jsonText){
				var obj = eval(jsonText);
				var stuffForPage='<ul>';
				for(i in obj){
					stuffForPage+="<li>"+obj[i].username+" challenged you. <a href='game/konnekt4.php?player="+<?php echo $_SESSION['user_Id']; ?>+"&gameId="+obj[i].game_Id+"'>Game "+obj[i].game_Id+"</a></li>";
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
</script>
</head>
<body onLoad="init()">
	<div id="foyer_container">
        <div id="leftCol">
        	<img src="images/title.png"/>
            <div class="box" id="users">
                <h3>Users Online:</h3>
                <ul id="usersLoggedIn">
                </ul>
            </div>
        </div>
        <div id="rightCol">
            <?php echo $content; ?>
            <div id="chat-container" class="box">
                <div id="chat-padder" class="box">
                    <div id="chat-box" ></div>
                 </div>
    	        <form id="chat-form" method="" action="" onSubmit="scrollBox(); return false">
                Chat: <input id="chat-input" value="" type="text" name="message" onChange="sendChat(this.value)"/>
                <!--<input type="submit" name="setChat" value="Send"/>-->
        	    </form>
            </div>
            <div class="box" id="games-avail">No Games Currently</div>
            <div class="box" id="games-avail2">No Games Currently</div>
        </div>
	</div>
</body>
