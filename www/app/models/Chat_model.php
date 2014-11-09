<?php
class Chat_model extends CI_Model {

  public $user_id;
  public $message;
  public $time;

  public function __construct()
  {
    parent::__construct();
  }

  //inserts a new chat message to the database
  public function setChat($message){
    $time = time();
    $data = array(
        'user_Id' => $_SESSION['user_Id'],
        'message' => $message,
        'time' => $time
    );
    $this->db->insert('chat', $data);
  }

  //gets chat messages from database
  public function getChat($time){
    $query = $this->db->select('u.username, c.message, c.time, c.chat_Id, c.user_Id')->from('chat c')->join('users u','c.user_Id=u.user_Id', 'inner')->where('time>=',$time)->order_by('chat_Id', 'ASC')->get();

    // print_r($query);
    if($query->num_rows()>0){
      $result = $query->result();
      return $result;
    }
  }//end get chat

}
?>