<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Stat_model extends MY_Model {

  public $table = 'stat'; // you MUST mention the table name
  public $primary_key = 'id'; // you MUST mention the primary key
  public $protected = array('id');
  public $return_as = 'array';

  public function __construct() {

    parent::__construct();
  }


}
?>