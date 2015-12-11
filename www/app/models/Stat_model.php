<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Stat_model extends MY_Model {

  public $table = 'stat'; // you MUST mention the table name
  public $primary_key = 'id'; // you MUST mention the primary key
  public $protected = array('id');
  public $return_as = 'array';

  public function __construct() {

    parent::__construct();
  }

  public function update_stats($data){
    //update the game_users table with stat type for the correct user
    if($data['end_type'] == 'tie'){
      $this->add_ties($data['winner']['id']);
      $this->add_ties($data['loser']['id']);
    }else{
      $this->add_wins($data['winner']['id']);
      $this->add_losses($data['loser']['id']);
    }
  }

  private function add_wins($user_id){
    $this->db->query("UPDATE stat SET wins=wins+1 WHERE user_id=".$this->db->escape($user_id));
    // $this->update(array('wins'=>'wins+1'), array('user_id' => (int)$user_id), FALSE);
  }

  private function add_losses($user_id){
    $this->db->query("UPDATE stat SET losses=losses+1 WHERE user_id=".$this->db->escape($user_id));
    // $this->update(array('losses'=>'losses+1'), array('user_id' => (int)$user_id), FALSE);
  }

  private function add_ties($user_id){
    $this->db->query("UPDATE stat SET ties=ties+1 WHERE user_id=".$this->db->escape($user_id));
    // $this->update(array('ties'=>'ties+1'), array('user_id' => (int)$user_id), FALSE);
  }


}
?>
