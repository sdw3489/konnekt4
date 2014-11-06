<?php
///////////////////////////////////
// Game Model Class
// class which handles all game
// interactions with the database
///////////////////////////////////
require_once "../../_db/dbInfo.php";
require_once "../commHelpers.php";

class gameModel{

  private $link;

  public function __construct(){
    // session_start();
    $this->link = $this->mkLink();
  }
  public function __destruct(){

  }
  public function mkLink(){
    $link = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
    if(mysqli_connect_errno()){
      print('connection failed: '. mysqli_connect_error());
      exit();
    }
    return $link;
  }
  public function newGame($user_Id, $challenged){
    $time=time();
    if($stmt = $this->link->prepare("INSERT INTO game VALUES ('NULL',0,?,'NULL','NULL','NULL',?,'NULL','NULL','NULL',?)")) {
      $stmt->bind_param("iii", $user_Id, $challenged, $time);
      $stmt->execute();
      $stmt->close();
    }
  }
  public function getChallenges($user_Id){
    if($stmt = $this->link->prepare("SELECT u.username, g.game_Id FROM game g INNER JOIN users u ON g.player1_Id=u.user_Id WHERE player0_Id=?")) {
      $stmt->bind_param("i",$user_Id);
      $data = returnAssocArray($stmt);
      $stmt->close();
    }
    header('Content-Type: text/plain');
    return json_encode($data);
  }
  public function getChallengers($user_Id){
    if($stmt = $this->link->prepare("SELECT u.username, g.game_Id FROM game g INNER JOIN users u ON g.player0_Id=u.user_Id WHERE player1_Id=?")) {
      $stmt->bind_param("i", $user_Id);
      $data = returnAssocArray($stmt);
      $stmt->close();
      header('Content-Type: text/plain');
      return json_encode($data);
    }
  }
  public function start($game_Id){
    if($stmt = $this->link->prepare("UPDATE game SET player0_pieceId=null, player0_boardR=null, player0_boardC=null, player1_pieceId=null, player1_boardR=null, player1_boardC=null WHERE game_Id=?")){
      $stmt->bind_param("s",$game_Id);
      $stmt->execute();
      $stmt->close();
    }
    if($stmt = $this->link->prepare("SELECT * FROM game WHERE game_Id=?")){
      $stmt->bind_param("s",$game_Id);
      $data = returnAssocArray($stmt);
      $stmt->close();
    }
    header('Content-Type: text/plain');
    return json_encode($data);
  }
  public function changeTurn($game_Id){
    if($stmt = $this->link->prepare("UPDATE game SET whoseTurn=ABS(whoseTurn-1) WHERE game_Id=?")){
      $stmt->bind_param("s",$game_Id);
      $stmt->execute();
      $stmt->close();
    }
  }
  public function checkTurn($game_Id){
    if($stmt = $this->link->prepare("SELECT whoseTurn FROM game WHERE game_Id=?")){
      $stmt->bind_param("s",$game_Id);
      $data = returnAssocArray($stmt);
      $stmt->close();
      }
    header('Content-Type: text/plain');
    return json_encode($data);
  }
  public function changeBoard($game_Id, $playerId, $pieceId, $boardR, $boardC){
    if($stmt = $this->link->prepare("UPDATE game SET player".$playerId."_pieceId=?, player".$playerId."_boardR=?, player".$playerId."_boardC=? WHERE game_Id=?")){
      $stmt->bind_param("ssss", $pieceId, $boardR, $boardC, $game_Id);
      $stmt->execute();
      $stmt->close();
    }
  }
  public function getMove($game_Id){
    if($stmt = $this->link->prepare("SELECT * FROM game WHERE game_Id=?")){
      $stmt->bind_param("s",$game_Id);
      $data = returnAssocArray($stmt);
      $stmt->close();
    }
    header('Content-Type: text/plain');
    return json_encode($data);
  }
}//end class

?>
