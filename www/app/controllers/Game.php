<?php
class Game extends CI_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('game_model', 'Game', TRUE);
    $this->load->driver('session');
  }

  public function play($game_Id){
    $data['title'] = 'Game Board';
    $data['bodyClass'] = 'game';
    $data['gameData'] = $this->getGameData($game_Id);
    $this->load->view('global/head', $data);
    $this->load->view('global/nav', $data);
    $this->load->view('game', $data);
    $this->load->view('global/footer', $data);
  }

  public function getGameData($game_Id){
    $data = $this->Game->getGameData($game_Id);
    return json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function challenge($id){
    $data = $this->Game->newGame($_SESSION['id'], $id);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function getChallenges(){
    $data = $this->Game->getChallenges($_SESSION['id']);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function getChallengers(){
    $data = $this->Game->getChallengers($_SESSION['id']);
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



  // public function _remap($method, $params = array()) {
  //   if (method_exists($this, $method)){
  //     return call_user_func_array(array($this, $method), $params);
  //   }
  //   show_404();
  // }

}
?>