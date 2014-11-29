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
        'user_id' => $_SESSION['id'],
        'message' => $message,
        'time' => $time
    );
    $this->db->insert('chat', $data);
  }

  //gets chat messages from database
  public function getChat($time){
    $query = $this->db->select('u.username, c.message, c.time, c.id, c.user_id')
    ->from('chat c')
    ->join('user u','c.user_id=u.id', 'inner')
    ->where('c.time>=',$time)
    ->order_by('c.time', 'ASC')->get();

    // print_r($query);
    if($query->num_rows()>0){
      $result = $query->result();
      return $result;
    }
  }//end get chat

}
?>