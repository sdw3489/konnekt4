<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Chat extends CI_Controller {

  public function __construct(){

    parent::__construct();
    $this->load->model('Chat_model', 'Chat', TRUE);
    $this->load->model('User_model', 'User', TRUE);
    $this->load->driver('session');
    $this->load->helper(array('url'));
    $this->session_id = $this->session->userdata('id');
  }

  public function index(){
    if($this->session_id){
      redirect('/');
    }else{
      redirect('/login/');
    }
  }

   //inserts a new chat message to the database
  public function create_chat(){
    if($this->input->is_ajax_request()){
      $data = array(
        'user_id' => $_SESSION['id'],
        'message' => $this->input->post('message'),
      );
      $this->Chat->insert($data);
      $this->_get_chat();
    }else{
      redirect('/');
      die();
    }
  }//end send chat

  //gets chat messages from database
  public function get_chat(){
    if($this->input->is_ajax_request()){
      $this->_get_chat();
    }else{
      redirect('/');
      die();
    }
  }//end get chat

  private function _get_chat(){
    $data = $this->Chat->with_user('fields: username')
                       ->where('created_at >=', date('Y-m-d h:i:s',$_SESSION['time']))
                       ->order_by('created_at', 'ASC')
                       ->get_all();
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

}
?>