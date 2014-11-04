<?php
///////////////////////////////////////////////
// game controller
// handles all ajax calls for games
// distributes calls to correct gameModel function
///////////////////////////////////////////////////
session_start();
include_once "../models/gameModel.php";

if(isset($_GET['challenge'])){
	$gameModel = new gameModel();
	$gameModel->newGame($_SESSION['user_Id'],$_GET['user_Id']);
	header("Location:/");
	unset($gameModel);
}
else if(isset($_GET['getChallenges'])){
	$gameModel = new gameModel();
	$game = $gameModel->getChallenges($_SESSION['user_Id']);
	echo $game;
}
else if(isset($_GET['getChallengers'])){
	$gameModel = new gameModel();
	$game = $gameModel->getChallengers($_SESSION['user_Id']);
	echo $game;
}

//ajax calls
else if(isset($_GET['start'])){
  $gameModel = new gameModel();
	$game = $gameModel->start($_GET['start']);
	echo $game;
	unset($gameModel);
}
elseif(isset($_GET['changeTurn'])){
  $gameModel = new gameModel();
	$gameModel->changeTurn($_GET['changeTurn']);
	unset($gameModel);
}
elseif(isset($_GET['checkTurn'])){
	$gameModel = new gameModel();
	$turn = $gameModel->checkTurn($_GET['checkTurn']);
	echo $turn;
	unset($gameModel);
}
elseif(isset($_GET['changeBoard'])){
	$gameModel = new gameModel();
	$gameModel->changeBoard($_GET['changeBoard'], $_GET['playerId'], $_GET['pieceId'],$_GET['boardR'],$_GET['boardC']);
	unset($gameModel);
}
elseif(isset($_GET['getMove'])){
  $gameModel = new gameModel();
	$move = $gameModel->getMove($_GET['getMove']);
	echo $move;
	unset($gameModel);
}
else{
	header("Location:/");
}
?>