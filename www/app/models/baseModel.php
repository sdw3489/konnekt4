<?php
///////////////////////////////////
// Model Base Class
// Handles Database Connection
///////////////////////////////////////
require_once "../../_db/dbInfo.php";
require_once "../commHelpers.php";

class baseModel{

  public $link;

  public function __construct(){
    $this->link = $this->mkLink();
  }

  public function __destruct(){
    $this->closeLink();
  }

  public function mkLink(){

    $db = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
    if(mysqli_connect_errno()){
      print('connection failed: '. mysqli_connect_error());
      exit();
    }
    return $db;
  }

  public function closeLink(){
    mysqli_close ( $this->link );
  }

}//end class

?>
