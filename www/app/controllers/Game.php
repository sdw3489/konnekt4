<?php
class Game extends CI_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('game_model', 'Game', TRUE);
    $this->load->driver('session');
  }

  public function play($game_Id){
    $data['title'] = 'Game Board';
    $data['gameId'] = $game_Id;
    $data['player'] = $this->session->userdata('user_Id');
    $this->load->view('global/head', $data);
    $this->load->view('global/nav', $data);
    $this->load->view('game', $data);
  }

  public function start($game_Id){
    $data = $this->Game->start($game_Id);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function challenge($user_Id){
    $data = $this->Game->newGame($_SESSION['user_Id'], $user_Id);
    header("Location:/");
  }

  public function getChallenges(){
    $data = $this->Game->getChallenges($_SESSION['user_Id']);
    echo json_encode($data);
  }

  public function getChallengers(){
    $data = $this->Game->getChallengers($_SESSION['user_Id']);
    echo json_encode($data);
  }

  public function _remap($method){
    if (method_exists($this, $method)){
      $this->$method();
    } else {
      $this->index($method);
    }
  }

}
?>