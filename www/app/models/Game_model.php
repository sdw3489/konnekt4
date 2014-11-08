<?php
class Game_model extends CI_Model {

  private $table;

  public function __construct() {
    parent::__construct();

    $this->table = 'game';
  }

  public function newGame($user_Id, $challenged){
    $time=time();
    $this->db->insert($this->table, array('player0_id' => $user_Id, 'player1_id' => $challenged, 'last_updated' => $time ));
  }

  public function start($game_Id){
    $query = $this->db->get_where($this->table, array('game_Id'=> $game_Id));
    if($query->num_rows() > 0){
      $results =  $query->result();
      return $results;
    }
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