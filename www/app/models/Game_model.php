<?php
class Game_model extends CI_Model {

  private $table;

  public function __construct() {
    parent::__construct();

    $this->table = 'game';
  }

  public function newGame($user_id, $challenged_id){
    $time=time();
    $this->db->insert($this->table, array(
      'whose_turn' => 0,
      'active'=>1,
      'last_updated' => $time
    ));
    $insert_id = $this->db->insert_id();
    $this->db->insert('game_user', array(
      'game_id'=> $insert_id,
      'user_id'=> $user_id,
      'challenge_type_id'=>1
    ));
    $this->db->insert('game_user', array(
      'game_id'=> $insert_id,
      'user_id'=> $challenged_id,
      'challenge_type_id'=>2
    ));
  }

  public function getGameData($id){
    $result = [];
    $game_query = $this->db->select('id AS game_id, whose_turn, board, last_move, last_updated, active')
     ->from('game')
     ->where('id', $id)
     ->get();
    $result = $game_query->row_array();

    if($game_query->num_rows() > 0){
      $game_query->free_result();

      $players_query = $this->db->select('u.id AS user_id, challenge_type_id, u.username')
       ->from('game_user gu')
       ->where('gu.game_id', $id)
       ->join('user u', 'u.id = gu.user_id', 'inner')
       ->get();
      $players = $players_query->result();
      $players_query->free_result();

      $current = $this->session->userdata('id');
      foreach($players as $player){
        if($player->user_id == $current){
          $result['players'][0]['id'] = $player->user_id;
          $result['players'][0]['username'] = $player->username;
          $result['players'][0]['name'] = ucfirst($player->username);
          $result['players'][0]['challenge_type_id'] = $player->challenge_type_id;
          $result['players'][0]['playerId'] = ($player->challenge_type_id == 1)? 0 : 1;
          $result['players'][0]['current'] = ($player->user_id == $current)? TRUE : FALSE;
          $result['current_player']['id'] = $player->user_id;
          $result['current_player']['playerId'] = ($player->challenge_type_id == 1)? 0 : 1;
          $result['current_player']['username'] = $player->username;
          $result['current_player']['name'] = ucfirst($player->username);
        }else{
          $result['players'][1]['id'] = $player->user_id;
          $result['players'][1]['username'] = $player->username;
          $result['players'][1]['name'] = ucfirst($player->username);
          $result['players'][1]['challenge_type_id'] = $player->challenge_type_id;
          $result['players'][1]['playerId'] = ($player->challenge_type_id == 1)? 0 : 1;
          $result['players'][1]['current'] = ($player->user_id == $current)? TRUE : FALSE;
          $result['opponent_player']['id'] = $player->user_id;
          $result['opponent_player']['playerId'] = ($player->challenge_type_id == 1)? 0 : 1;
          $result['opponent_player']['username'] = $player->username;
          $result['opponent_player']['name'] = ucfirst($player->username);
        }
      }
      return $result;
    }
  }

  public function getChallenges($user_id, $challenge_type_id){
    $games = $this->db->select('g.id')->from('game g')
      ->join('game_user gu','gu.game_id=g.id', 'inner')
      ->where('gu.user_id', $user_id)
      ->where('gu.challenge_type_id', $challenge_type_id)
      ->where('g.active', 1)
      ->get();

    if($games->num_rows() > 0){
      $result = []; $i = 0;
      foreach ($games->result() as $game){
        $game_id = $game->id;
        $query = $this->db->select('u.username, gu.game_id')
          ->from('game_user gu')
          ->join('user u','gu.user_id=u.id', 'inner')
          ->where('gu.game_id',$game_id)
          ->where_not_in('gu.user_id', $user_id)
          ->get();
        if($query->num_rows() > 0){
          foreach($query->result() as $challenge){
            $result[$i]['username'] = $challenge->username;
            $result[$i]['game_id'] = $challenge->game_id;
            $i++;
          }
        }
      }
      return $result;
    }
  }

  public function getTurn($id){
    $query = $this->db->select('whose_turn')->where('id', $id)->get('game');
    if($query->num_rows() > 0){
      return $query->result();
    }
  }

  public function changeTurn($id){
    // $query = $this->db->where('id', $id)->update('game', array('whose_turn'=>ABS('whose_turn-1')));

    $stmt = "UPDATE game SET whose_turn=ABS(whose_turn-1) WHERE id=?";
    $this->db->query($stmt, array($id));
  }

  public function updateBoard($game_id, $board){
    $data = array(
      'board'=>$board
    );
    $query = $this->db->where('id', $game_id)->update('game', $data);
  }

  public function updateLastMove($game_id, $move){
    $data = array(
      'last_move'=>$move
    );
    $query = $this->db->where('id', $game_id)->update('game', $data);
  }

  public function getMove($id){
    $query = $this->db->select('last_move')->from($this->table)->where('id', $id)->get();
    if($query->num_rows() > 0){
      $results =  $query->row_array();
      return $results['last_move'];
    }
  }

  public function end($game_id, $endData){
    //Set the game to inactive and set the end type id
    $this->db->where('id', $game_id)
      ->update('game',array(
        'active'=>0,
        'end_type_id'=> $endData['end_type_id']
      ));

    //update the game_users table with stat type for the correct user
    $this->db->where('game_id', $game_id)
      ->where('user_id', $endData['winner']['id'])
      ->update('game_user', array('stat_type_id' => 1));

    $this->db->where('game_id', $game_id)
      ->where('user_id', $endData['loser']['id'])
      ->update('game_user', array('stat_type_id' => 2));

    $this->db->query("UPDATE stat SET wins=wins+1 WHERE user_id=".$this->db->escape($endData['winner']['id']));;
    $this->db->query("UPDATE stat SET losses=losses+1 WHERE user_id=".$this->db->escape($endData['loser']['id']));
  }
}
?>