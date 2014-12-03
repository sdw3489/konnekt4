<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Game extends CI_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('game_model', 'Game', TRUE);
    $this->load->model('user_model', 'User', TRUE);
    $this->load->driver('session');
    $this->session_id = $this->session->userdata('id');
  }

  public function index(){
    if($this->session_id){
      header("Location:/");
    }else{
      header("Location:/login/");
    }
  }

  public function play($game_Id){
    if($this->session_id){
      if(isset($game_Id)){
        $data['title'] = 'Game Board';
        $data['bodyClass'] = 'game';
        $data['gameJSON'] = $this->getGameData($game_Id);
        $data['notifications'] = $this->User->getNotifications($_SESSION['id']);
        $this->load->view('global/head', $data);
        $this->load->view('global/nav', $data);
        $this->load->view('game', $data);
        $this->load->view('global/footer', $data);
      }else{
        header("Location:/");
      }
    }else{
      header("Location:/login/");
    }
  }

  public function getGameData($game_Id){
    $data = $this->Game->getGameData($game_Id);
    return json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function challenge($id){
    $data = $this->Game->newGame($_SESSION['id'], $id);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function getChallenges($challenge_type_id){
    $data = $this->Game->getChallenges($_SESSION['id'], $challenge_type_id);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function getTurn($game_Id){
    $data = $this->Game->getTurn($game_Id);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function changeTurn($game_Id){
    $this->Game->changeTurn($game_Id);
  }

  public function updateBoard($game_id){
    $data = $this->input->post('data');
    $this->Game->updateBoard($game_id, $data);
  }

  public function updateLastMove($game_Id){
    $data = $this->input->post('data');
    $this->Game->updateLastMove($game_Id, $data);
  }

  public function getMove($game_Id){
    $data = $this->Game->getMove($game_Id);
    echo $data;
  }

  public function end($game_Id){
    $data = $this->input->post('data');
    $this->Game->end($game_Id, $data);
  }


  // public function _remap($method, $params = array()) {
  //   if (method_exists($this, $method)){
  //     return call_user_func_array(array($this, $method), $params);
  //   }
  //   show_404();
  // }

}
?>