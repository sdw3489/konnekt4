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
      die();
    }else{
      redirect('/login/');
    }
  }
}
?>