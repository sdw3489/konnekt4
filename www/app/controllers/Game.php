<?php
class Game extends CI_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('game_model', 'Game', TRUE);
    $this->load->driver('session');
  }

  public function index(){

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

}
?>