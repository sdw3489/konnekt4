<?php
class User_model extends CI_Model {

  public $name;
  public $email;
  public $password;
  public $logged_in;

  public function __construct() {
    parent::__construct();
  }

  //checks a users login to see if they exist in the database
  public function login(){
    $encrypted_password = sha1($this->input->post('password'));
    $username = $this->input->post('name');
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
    $encrypted_password = sha1($this->input->post('password'));
    $username = $this->input->post('name');
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

   //register a new user into the database
  public function register(){
    $data = array(
      'username' => $this->input->post('username'),
      'password' => sha1($this->input->post('password')),
    );
    $this->db->insert('user', $data);
    $insert_id = $this->db->insert_id();
    $this->db->insert('stat', array('user_id'=>$insert_id));
  }//end register

  public function getLoggedIn(){
    $query = $this->db->where('logged_in', 1)->where_not_in('id',$_SESSION['id'])->get('user');
    $result= $query->result();
    if($query->num_rows() > 0){
      return $result;
    }
  }

  public function getUserInfo($id){
    $query = $this->db->select('id, username')->where('id', $id)->get('user');
    $result= $query->result();
    if($query->num_rows() > 0){
      return $result;
    }
  }

  public function getStats($id){
    $query = $this->db->select('wins, losses, ties')->where('user_id', $id)->get('stat');
    $result= $query->row();
    if($query->num_rows() > 0){
      return $result;
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
}
?>