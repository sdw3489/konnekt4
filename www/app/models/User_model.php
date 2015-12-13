<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends MY_Model {

  public $table = 'user'; // you MUST mention the table name
  public $primary_key = 'id'; // you MUST mention the primary key
  public $protected = array('id');
  public $before_create = array( 'hash_password' );
  public $before_update = array( 'hash_password' );
  public $return_as = 'array';
  public $rules = array(
    'insert' => array(
        'username' => array(
            'field' => 'username',
            'label' => 'Username',
            'rules' => 'trim|required|min_length[3]|max_length[12]|is_unique[user.username]|xss_clean',
            'errors' => array(
                'required'  => 'You have not provided a %s.',
                'is_unique' => 'This %s already exists.'
            )
        ),
        'email' => array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => 'trim|required|valid_email|xss_clean'
        ),
        'first_name' => array(
            'field' => 'first_name',
            'label' => 'First Name',
            'rules' => 'trim|xss_clean'
        ),
        'last_name' => array(
            'field' => 'last_name',
            'label' => 'Last Name',
            'rules' => 'trim|xss_clean'
        ),
        'password' => array(
            'field' => 'password',
            'label' => 'Password',
            'rules' => 'trim|required|min_length[3]|xss_clean'
        ),
        'confirm_password' => array(
            'field' => 'confirm_password',
            'label' => 'Password Confirmation',
            'rules' => 'trim|required|matches[password]|xss_clean',
            'errors' => array(
                'matches' => 'Passwords do not match.'
            )
        )
    ),
    'update' => array(
        'email' => array(
            'field'=>'email',
            'label'=>'Email',
            'rules'=>'trim|required|valid_email|xss_clean'
        ),
        'first_name' => array(
            'field' => 'first_name',
            'label' => 'First Name',
            'rules' => 'trim|xss_clean'
        ),
        'last_name' => array(
            'field' => 'last_name',
            'label' => 'Last Name',
            'rules' => 'trim|xss_clean'
        )
    ),
    'change_password' => array(
        'password' => array(
            'field' => 'password',
            'label' => 'Password',
            'rules' => 'trim|required|min_length[3]|xss_clean'
        ),
        'confirm_password' => array(
            'field' => 'confirm_password',
            'label' => 'Password Confirmation',
            'rules' => 'trim|required|matches[password]|xss_clean',
            'errors' => array(
                'matches' => 'Passwords do not match.'
            )
        )

    )

  );

  public function __construct() {
    $this->has_many['chat'] = array('foreign_model'=>'Chat_model','foreign_table'=>'chat','foreign_key'=>'user_id','local_key'=>'id');
    $this->has_many_pivot['games'] = array(
      'foreign_model'=>'Game_model',
      'pivot_table'=>'game_user',
      'local_key'=>'id',
      'pivot_local_key'=>'user_id',
      'pivot_foreign_key'=>'game_id',
      'foreign_key'=>'id',
      'get_relate'=>TRUE
    );
    // $this->has_one['stat'] = array('foreign_model'=>'Stat_model','foreign_table'=>'stat','foreign_key'=>'user_id','local_key'=>'id');

    parent::__construct();
  }

  //checks a users login to see if they exist in the database
  public function login(){
    $encrypted_password = sha1($this->input->post('login_password'));
    $username = $this->input->post('username');
    $query = $this->db->get_where('user', array('username'=>$username, 'password'=>$encrypted_password));
    $result = $query->result();
    if($query->num_rows() > 0){
      $id=$result[0]->id;
      $this->db->where('id',$id);
      $this->db->update('user', array('logged_in'=>1));
      return $result;
    }else{
      return false;
    }
  }

  //Check username is valid
  public function validUser($username){
    $encrypted_password = sha1($this->input->post('login_password'));
    $username = $this->input->post('username');
    $query = $this->db->get_where('user', array('username'=>$username, 'password'=>$encrypted_password));
    $result = $query->result();
    if($query->num_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  //Logout Function
  public function logout($id){
    if ($id){
      $this->db->where('id',$id);
      $this->db->update('user', array('logged_in'=>0));
      return true;
    }else{
      return false;
    }
  }

  public function getFriends($id){
    $query = $this->db->select('*')
    ->from('user_connection')
    ->group_start()
      ->where('status', 'connected')
      ->group_start()
        ->or_where('user_id', $id)
        ->or_where('connection_id',$id)
      ->group_end()
    ->group_end()
    ->get();
    $results=[];
    if($query->num_rows() > 0){
      $i = 0;
      foreach($query->result() as $row){

        if($row->user_id == $id){
          $query2 = $this->db->select('id, username, logged_in, first_name, last_name')
            ->where('id', $row->connection_id)
            ->get('user');
          if($query2->num_rows() > 0){
            $results[$i] = $query2->row();
          }
        }elseif($row->connection_id == $id){
          $query3 = $this->db->select('id, username, logged_in, first_name, last_name')
            ->where('id', $row->user_id)
            ->get('user');
          if($query3->num_rows() > 0){
            $results[$i] = $query3->row();
          }
        }
        $i++;
      }
      return $results;
    }
  }

  public function users(){
    $result=[];
    $users = $this->db->select('u.id, u.username, u.email, u.first_name, u.last_name, u.logged_in, s.wins, s.losses, s.ties')
      ->from('user u')
      ->join('stat s', 'u.id = s.user_id', 'inner')
      ->get();

    if($users->num_rows() > 0){
      $result = $users->result();
      $i = 0;
      foreach($users->result() as $user){
        $connections = $this->db->select('uc.*')
          ->from('user_connection uc')
          ->join('user u', 'u.id = uc.user_id', 'right')
          ->or_where('uc.user_id',  $user->id)
          ->or_where('uc.connection_id', $user->id)
          ->get();
        $result[$i]->connections = $connections->result();
        $i++;
      }

    }
    return $result;
  }

  public function connect($current_id, $id, $type) {
    $query = $this->db->select('id, status')->where('user_id', min($current_id, $id))->where('connection_id', max($current_id, $id))->get('user_connection');

    if(!$query->num_rows() > 0 && $type == 'connect'){
      $data = array(
        'user_id'       => min($current_id, $id),
        'connection_id' => max($current_id, $id),
        'initiator_id'  => $current_id,
        'status'        => 'sent'
      );
      $this->db->insert('user_connection', $data);
      return true;
    }elseif($query->num_rows() > 0 && $type == 'connect' && $query->row()->status == 'declined'){
      $result = $this->db->where('id', $query->row()->id)->update('user_connection', array('status'=>'sent', 'initiator_id'=> $current_id));
      return $result;
    }elseif($query->num_rows() > 0 && $type == 'accept'){
      $result = $this->db->where('id', $query->row()->id)->update('user_connection', array('status'=>'connected'));
      return $result;
    }elseif($query->num_rows() > 0 && $type == 'decline'){
      $result = $this->db->where('id', $query->row()->id)->update('user_connection', array('status'=>'declined'));
      return $result;
    }elseif($query->num_rows() > 0 && $type == 'remove'){
      $result = $this->db->where('id', $query->row()->id)->delete('user_connection');
      return $result;
    }else{
      return false;
    }
  }

  public function getConnections($current_id, $id){
    $query = $this->db->select('*')->where('user_id', min($current_id, $id))->where('connection_id', max($current_id, $id))->get('user_connection');
    if($query->num_rows()){
      return $query->row();
    }
  }

  public function getNotifications($id){
    $query = $this->db->select('*')
    ->from('user_connection')
    ->group_start()
      ->where('status', 'sent')
      ->where('initiator_id !=', $id)
      ->group_start()
        ->or_where('user_id', $id)
        ->or_where('connection_id',$id)
      ->group_end()
    ->group_end()
    ->get();

    if($query->num_rows() > 0){
      return $query->num_rows();
    }else{
      return FALSE;
    }
  }

    //has password
  protected function hash_password($data){
      if(isset($data['password'])){
        $data['password'] = sha1($data['password']);
      }
      return $data;
  }
}
?>