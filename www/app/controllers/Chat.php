<?php
class Chat extends CI_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('chat_model', 'Chat', TRUE);
    $this->load->driver('session');
  }

  public function index(){

  }

   //inserts a new chat message to the database
  public function sendChat(){
    $message = $this->input->post('message');
    $this->Chat->setChat($message);
    $this->getChat($_SESSION['time']);
  }//end send chat

  //gets chat messages from database
  public function getChat(){
    $time = $_SESSION['time'];
    $data = $this->Chat->getChat($time);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }//end get chat

}
?>