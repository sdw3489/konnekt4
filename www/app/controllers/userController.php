<?php
/////////////////////////////////////
// user controller handler
// controls and distributes ajax calls for user interactions
/////////////////////////////////////
session_start();
include_once "../models/userModel.php";

if(isset($_POST['submit-login'])){
	if(!empty($_POST['name']) && !empty($_POST['password'])){
		$userModel = new userModel();
		$loggedIn = $userModel->loginUser($_POST['name'],$_POST['password']);
		unset($userModel);
		if($loggedIn){ header("Location:/index.php");}else{header("Location:/login");}
	}else{header("Location:/login");}
}
else if(isset($_POST['submit-register'])){
	$userModel = new userModel();
	$userModel->registerUser($_POST['username'],$_POST['password']);
	unset($userModel);
}
else if(isset($_GET['logout'])){
	$userModel = new userModel();
	$userModel->logoutUser();
	unset($userModel);
}
else if(isset($_GET['setChat'])){
	$userModel = new userModel();
	$userModel->setChat($_GET['message'],$_GET['game_Id']);
	$chat = $userModel->getChat($_GET['game_Id'],$_SESSION['time']);
	echo $chat;
	unset($userModel);
}
else if(isset($_GET['getChat'])){
	$userModel = new userModel();
	$chat = $userModel->getChat($_GET['game_Id'],$_SESSION['time']);
	echo $chat;
	unset($userModel);
}
else if(isset($_GET['getLoggedIn'])){
	$userModel = new userModel();
	$who = $userModel->getLoggedInUsers();
	unset($userModel);
	echo $who;
	unset($userModel);
}
else{
	header("Location:/index.php");
}
?>