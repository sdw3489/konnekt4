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
        'user_Id'=>$theuser->user_Id,
        'time'=> time()
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

  //Sign up page
  public function signup(){
    $data['title'] = 'Signup';
    $data['bodyClass'] = 'signup';
    $this->load->view('global/head', $data);
    $this->load->view('signup', $data);
    $this->load->view('global/footer', $data);
  }//end register


  //register a new user into the database
  public function register(){
    $this->User->register();
    header("Location:/");
  }//end register

  //Get list of logged in Users
  public function getLoggedIn(){
    $data = $this->User->getLoggedIn();
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function getUserInfo($user_Id){
    $data = $this->User->getUserInfo($user_Id);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

}
?>