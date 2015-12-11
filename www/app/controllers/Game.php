<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Game extends MY_Controller {

  protected $models = array('Game', 'User');
  private $session_id;

  public function __construct(){
    parent::__construct();
    $this->load->driver('session');
    $this->session_id = $this->session->userdata('id');
  }

  public function index(){
    if($this->session_id){
      redirect("/");
    }else{
      redirect("/login/");
    }
  }

  public function play($id){
    if($this->session_id){
      if(isset($id)){
        $this->data['title'] = 'Game Board';
        $this->data['bodyClass'] = 'game';
        $this->data['gameJSON'] = json_encode($this->Game->getGameData($id), JSON_NUMERIC_CHECK);
        $this->data['notifications'] = $this->User->getNotifications($this->session_id);
        $this->data['id'] = $this->session_id;
        $this->view = 'game';
      }else{
        redirect("/");
      }
    }else{
      redirect("/login/");
    }
  }

  // public function _remap($method, $params = array()) {
  //   if (method_exists($this, $method)){
  //     return call_user_func_array(array($this, $method), $params);
  //   }
  //   show_404();
  // }

}
?>