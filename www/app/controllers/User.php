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
    $this->load->helper(array('form', 'url'));
    $this->load->library('form_validation');
    $this->form_validation->set_rules(
     'username', 'Username', 'trim|required|min_length[3]|max_length[12]|is_unique[users.username]|xss_clean',
        array(
                'required'      => 'You have not provided a %s.',
                'is_unique'     => 'This %s already exists.'
        ));
    $this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[3]');

    if ($this->form_validation->run() == FALSE) {
      $data['title'] = 'Signup';
      $data['bodyClass'] = 'signup';
      $this->load->view('global/head', $data);
      $this->load->view('signup', $data);
      $this->load->view('global/footer', $data);
    } else{
      $this->User->register();
      header("Location:/");
    }
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