<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Game_model extends MY_Model {

  public $table = 'game'; // you MUST mention the table name
  public $primary_key = 'id'; // you MUST mention the primary key
  public $protected = array('id');
  public $return_as = 'array';

  public function __construct() {
    $this->has_many_pivot['user'] = array(
      'foreign_model'=>'User_model',
      'pivot_table'=>'game_user',
      'local_key'=>'id',
      'pivot_local_key'=>'game_id',
      'pivot_foreign_key'=>'user_id',
      'foreign_key'=>'id',
      'get_relate'=>TRUE
    );
    parent::__construct();
  }

  public function newGame($user_id, $challenged_id){
    $this->insert(array(
      'whose_turn' => 0,
      'active'=>1,
      'initiator_id'=>$user_id
    ));
    $insert_id = $this->db->insert_id();
    $this->db->insert('game_user', array(
      'game_id'=> $insert_id,
      'user_id'=> $user_id
    ));
    $this->db->insert('game_user', array(
      'game_id'=> $insert_id,
      'user_id'=> $challenged_id
    ));
    return $insert_id;
  }

  public function getGameData($id){
    $result = [];
    $users = $this->with_user()->get($id);
    $result = $users;
    if(count($users) > 0){
      $current = $this->session->userdata('id');
        foreach($users['user'] as $player){
          if($player['id'] == $current){
            $result['players'][0]['id'] = $player['id'];
            $result['players'][0]['username'] = $player['username'];
            $result['players'][0]['name'] = ucfirst($player['username']);
            $result['players'][0]['challenge_type_id'] = ($users['initiator_id'] == $player['id'])? 0 : 1;
            $result['players'][0]['playerId'] = ($users['initiator_id'] == $player['id'])? 0 : 1;
            $result['players'][0]['current'] = ($player['id'] == $current)? TRUE : FALSE;
            $result['current_player']['id'] = $player['id'];
            $result['current_player']['playerId'] = ($users['initiator_id'] == $player['id'])? 0 : 1;
            $result['current_player']['username'] = $player['username'];
            $result['current_player']['name'] = ucfirst($player['username']);
          }else{
            $result['players'][1]['id'] = $player['id'];
            $result['players'][1]['username'] = $player['username'];
            $result['players'][1]['name'] = ucfirst($player['username']);
            $result['players'][1]['challenge_type_id'] = ($users['initiator_id'] == $player['id'])? 0 : 1;
            $result['players'][1]['playerId'] = ($users['initiator_id'] == $player['id'])? 0 : 1;
            $result['players'][1]['current'] = ($player['id'] == $current)? TRUE : FALSE;
            $result['opponent_player']['id'] = $player['id'];
            $result['opponent_player']['playerId'] = ($users['initiator_id'] == $player['id'])? 0 : 1;
            $result['opponent_player']['username'] = $player['username'];
            $result['opponent_player']['name'] = ucfirst($player['username']);

        }
      }
      return $result;
    }
  }


  public function getChallenges($user_id){
    $games = $this->db->select('g.id, g.initiator_id')->from('game g')
      ->join('game_user gu','gu.game_id=g.id', 'inner')
      ->where('gu.user_id', $user_id)
      ->where('g.active', 1)
      ->get();

    $result = [];
    if($games->num_rows() > 0){
      $i = 0;
      foreach ($games->result() as $game){
        $game_id = $game->id;
        $query = $this->db->select('gu.id, gu.user_id, u.username, gu.game_id')
          ->from('game_user gu')
          ->join('user u','gu.user_id=u.id', 'inner')
          ->where('gu.game_id',$game_id)
          ->where_not_in('gu.user_id', $user_id)
          ->get();
        if($query->num_rows() > 0){
          foreach($query->result() as $challenge){
            $result[$i]['id'] = ucfirst($challenge->id);
            $result[$i]['user_id'] = ucfirst($challenge->user_id);
            $result[$i]['username'] = ucfirst($challenge->username);
            $result[$i]['game_id'] = $challenge->game_id;
            $result[$i]['initiator_id'] = $game->initiator_id;
            $i++;
          }
        }
      }
    }else{
      $result = FALSE;
    }
    return $result;
  }


  public function changeTurn($id){
    // $query = $this->db->where('id', $id)->update('game', array('whose_turn'=>ABS('whose_turn-1')));
    $stmt = "UPDATE game SET whose_turn=ABS(whose_turn-1) WHERE id=?";
    $this->db->query($stmt, array($id));
    return $id;
  }

}
?>