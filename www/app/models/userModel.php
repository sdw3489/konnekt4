<?php
///////////////////////////////////
// userModel Class
// Handles all database interaction related to users
///////////////////////////////////////
require_once "../../_db/dbInfo.php";
require_once "../commHelpers.php";

class userModel{

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

  //checks a users login to see if they exist in the database
  public function loginUser($name, $password){
    $encrypted_password = sha1($password);
    if($stmt = $this->link->prepare("SELECT user_Id, username, password FROM users WHERE username=? AND password=? ")){
      $stmt->bind_param("ss", $name, $encrypted_password);
      $stmt->execute();
      $meta = $stmt->result_metadata();
      while ($field = $meta->fetch_field())
      {
        $params[] = &$row[$field->name];
      }

      call_user_func_array(array($stmt, 'bind_result'), $params);

      while ($stmt->fetch()) {
        foreach($row as $key => $val)
        {
          $c[$key] = $val;
        }
        $result[] = $c;
      }
      $stmt->close();
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
  public function setChat($message, $game_Id){
    $time = time();
    if($stmt = $this->link->prepare("INSERT INTO chat VALUES('NULL', ?, ?, ?, ?)")){
      $stmt->bind_param("isii",$_SESSION['user_Id'],$message, $time, $game_Id);
      $stmt->execute();
      $stmt->close();
    }
  }

  //gets chat messages from database
  public function getChat($game_Id,$time){
    if($stmt = $this->link->prepare("SELECT u.username, c.message, c.time, c.chat_Id FROM chat c INNER JOIN users u ON c.user_Id=u.user_Id WHERE c.game_Id=? AND c.time>=? ORDER BY c.chat_Id ASC")){
      $stmt->bind_param("ii", $game_Id,$time);
      $data = returnAssArray($stmt);
      $data = stripslashes($data);
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
      $stmt->execute();
      $stmt->store_result();
      if($stmt->num_rows > 0){
        $meta = $stmt->result_metadata();
        while ($field = $meta->fetch_field())
        {
          $params[] = &$row[$field->name];
        }

        call_user_func_array(array($stmt, 'bind_result'), $params);

        while ($stmt->fetch()) {
          foreach($row as $key => $val)
          {
            $c[$key] = $val;
          }
          $result[] = $c;
        }
        $stmt->close();
        return  json_encode($result);
      }
    }
  }
}//end class

?>
