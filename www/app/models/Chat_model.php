<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Chat_model extends MY_Model {

  public $table = 'chat'; // you MUST mention the table name
  public $primary_key = 'id'; // you MUST mention the primary key
  public $protected = array('id');
  public $return_as = 'array';

  public function __construct()
  {
    $this->has_one['user'] = array('foreign_model'=>'User_model','foreign_table'=>'user','foreign_key'=>'id','local_key'=>'user_id');
    parent::__construct();
  }
}
?>