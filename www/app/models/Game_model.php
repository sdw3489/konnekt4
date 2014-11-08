<?php
class Game_model extends CI_Model {

  public function __construct() {
    parent::__construct();
  }

  public function getChallenges($user_Id){
    $query = $this->db->select('username, game_Id')->from('game')->join('users','game.player1_Id=users.user_Id', 'inner')->where('player0_Id',$user_Id)->get();
    if($query->num_rows() > 0){
      return $query->result();
    }
  }

  public function getChallengers($user_Id){
    $query = $this->db->select('username, game_Id')->from('game')->join('users','game.player0_Id=users.user_Id', 'inner')->where('player1_Id',$user_Id)->get();
    if($query->num_rows() > 0){
      return $query->result();
    }

  }
}
?>