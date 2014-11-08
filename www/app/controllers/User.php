<?php
class User extends CI_Controller {

  private $model;

  public function __construct(){
    parent::__construct();
    $this->load->model('user_model', 'User', TRUE);
    $this->load->driver('session');
  }

  public function index(){

  }

  //checks a users login to see if they exist in the database
  public function login() {
    $data['query'] = $this->User->login();
    if(count($data['query']) > 0 ){
      $theuser = $data['query'][0];
      $this->session->set_userdata(array(
        'username'=>$theuser->username,
        'user_Id'=>$theuser->user_Id
      ));
      header("Location:/");
    }else{
      return false;
    }
  }

  //Logout a user
  public function logout() {
    $id = $this->session->userdata('user_Id');
    $logged_out = $this->User->logout($id);
    if($logged_out){
      $this->session->sess_destroy();
      header("Location:/");
    }else{
      header("Location:/");
    }

  }
}
?>