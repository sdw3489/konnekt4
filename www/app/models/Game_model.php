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
    $data = array(
      "player0_pieceId"=> null,
      "player0_boardR" => null,
      "player0_boardC" => null,
      "player1_pieceId"=> null,
      "player1_boardR" => null,
      "player1_boardC" => null
    );
    $query = $this->db->where("game_Id", $game_Id)->update('game', $data);

    return $this->getMove($game_Id);
  }

  public function getGameData($game_Id){
    $query = $this->db->select('u1.username AS player0_name, u1.user_Id AS player0_Id, u2.username AS player1_name, u2.user_Id player1_Id, g.game_Id, g.whoseTurn')
    ->from('game g')->where("g.game_Id", $game_Id)
    ->join('users u1','g.player0_Id=u1.user_Id','inner')
    ->join('users u2','g.player1_Id=u2.user_Id','inner')->get();
    if($query->num_rows() > 0){
      return $query->result();
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

  public function getTurn($game_Id){
    $query = $this->db->select('whoseTurn')->where('game_Id', $game_Id)->get('game');
    if($query->num_rows() > 0){
      return $query->result();
    }
  }

  public function changeTurn($game_Id){
    // $query = $this->db->where('game_Id', $game_Id)->update('game', array('whoseTurn'=>ABS('whoseTurn-1')));

    $stmt = "UPDATE game SET whoseTurn=ABS(whoseTurn-1) WHERE game_Id=?";
    $this->db->query($stmt, array($game_Id));
  }

  public function changeBoard($game_Id, $playerId, $pieceId, $r, $c){
    $data = array(
      "player".$playerId."_pieceId"=> $pieceId,
      "player".$playerId."_boardR" => $r,
      "player".$playerId."_boardC" => $c
    );
    $query = $this->db->where('game_Id', $game_Id)->update('game', $data);
  }

  public function getMove($game_Id){
    $query = $this->db->get_where($this->table, array('game_Id'=> $game_Id));
    if($query->num_rows() > 0){
      $results =  $query->result();
      return $results;
    }
  }
}
?>