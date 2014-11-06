<?php
///////////////////////////////////
// userModel Class
// Handles all database interaction related to users
///////////////////////////////////////
require_once "../../_db/dbInfo.php";
require_once "../commHelpers.php";
require_once "./baseModel.php";

class userModel extends baseModel{

  public function __construct(){
    parent::__construct();
  }

  public function __destruct(){
    parent::__destruct();
  }

  //checks a users login to see if they exist in the database
  public function loginUser($name, $password){
    $encrypted_password = sha1($password);
    if($stmt = $this->link->prepare("SELECT user_Id, username, password FROM users WHERE username=? AND password=? ")){
      $stmt->bind_param("ss", $name, $encrypted_password);
      $result = returnAssocArray($stmt);
    }

    if(!$result || (count($result) == 0 )){
      return false;
    }else{
      $id=$result[0]['user_Id'];
      if($stmt = $this->link->prepare("UPDATE users SET logged_In=1 WHERE user_Id=?")){
        $stmt->bind_param("s",$id);
        $stmt->execute();
        $stmt->close();
      }

      $_SESSION['username'] = $result[0]['username'];
      $_SESSION['user_Id'] = $result[0]['user_Id'];
      $_SESSION['time'] = time();
      return true;
    }
  }//end login

  //register a new user into the database
  public function registerUser($username, $password){
    $encrypted_password = sha1($password);
    if($stmt = $this->link->prepare("INSERT INTO users (user_Id, username, password, logged_In) VALUES (NULL,?,?,0)")) {
      $stmt->bind_param("ss", $username, $encrypted_password);
      $stmt->execute();
      $stmt->close();
    }
    header("Location:/?username=".$username);

  }//end register



  //Logout Function
  public function logoutUser(){
    if (isset($_SESSION['user_Id'])){
      if($stmt = $this->link->prepare("UPDATE users SET logged_In=0 WHERE user_Id=?")){
        $stmt->bind_param("s",$_SESSION['user_Id']);
        $stmt->execute();
        $stmt->close();
      }
      // unset session variable
      unset($_SESSION['user_Id']);
      /* invalidate the session cookie
      if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time()-86400, '/');
      }*/
      //end session
      session_destroy();
      header("Location:/");
      }
    else{
      header("Location:/");
    }
  }//end logout


  //inserts a new chat message to the database
  public function setChat($message){
    $time = time();
    if($stmt = $this->link->prepare("INSERT INTO chat VALUES('NULL', ?, ?, ?)")){
      $stmt->bind_param("isi",$_SESSION['user_Id'],$message, $time);
      $stmt->execute();
      $stmt->close();
    }
  }

  //gets chat messages from database
  public function getChat($time){
    if($stmt = $this->link->prepare("SELECT u.username, c.message, c.time, c.chat_Id FROM chat c INNER JOIN users u ON c.user_Id=u.user_Id WHERE c.time>=? ORDER BY c.chat_Id ASC")){
      $stmt->bind_param("i",$time);
      $data = returnAssocArray($stmt);
      $data = stripslashes(json_encode($data));
      $stmt->close();
    }
    //next 5 lines will clear the cache
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    //this line MUST be here, it declares the content-type
    header('Content-Type: text/plain');
    return $data; // This will become the response value for the XMLHttpRequest object
  }//end get chat

  public function getLoggedInUsers(){
    if($stmt = $this->link->prepare("SELECT * FROM users WHERE logged_In=1 AND user_Id<>?")){
      $stmt->bind_param("i",$_SESSION['user_Id']);
      $data = returnAssocArray($stmt);
      $stmt->close();
      return json_encode($data);
    }
  }

  public function getUserInfo($user_Id){
    if($stmt = $this->link->prepare("SELECT user_Id, username FROM users WHERE user_Id=?")){
      $stmt->bind_param("i",$user_Id);
      $data = returnAssocArray($stmt);
      $stmt->close();
      return json_encode($data);
    }
  }
}//end class

?>
