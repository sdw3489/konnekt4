<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class User extends MY_Controller {

  protected $models = array('User', 'Stat');
  protected $helpers = array('form', 'url');

  public function __construct(){
    parent::__construct();
    $this->load->driver('session');
    $this->load->library('form_validation');
    $this->session_id = $this->session->userdata('id');
  }

  public function index(){
    if($this->session_id){
      $this->data['title'] = 'Users';
      $this->data['bodyClass'] = 'users';
      $this->data['users'] = $this->User->users();
      $this->data['usersJSON'] = json_encode($this->data['users'], JSON_NUMERIC_CHECK);
      $this->data['id'] = $this->session_id;
      $this->data['notifications'] = $this->User->getNotifications($_SESSION['id']);
      $this->view = 'users';
    }else{
      redirect('/login/');
    }
  }

  public function profile($id){
    if($this->session_id){
      $this->data['title'] = 'Profile';
      $this->data['bodyClass'] = 'profile';
      $this->data['id'] = $this->session_id;
      $this->data['notifications'] = $this->User->getNotifications($id);
      $this->data['user'] = $this->User->get($id);
      $this->view = 'profile/main';
    }else{
      redirect('/login/');
    }
  }

  public function edit($id){
    if($this->session_id){
      if($this->session_id == $id){
        $result = $this->User->from_form(NULL,NULL,array('id' => $id))->update();
        if ($result == FALSE) {
          $this->data['title'] = 'Edit Profile';
          $this->data['bodyClass'] = 'profile';
          $this->data['id'] = $this->session_id;
          $this->data['notifications'] = $this->User->getNotifications($id);
          $this->data['user'] = $this->User->get($id);
          $this->view = 'profile/edit';
        }else{
          redirect('/user/'.$id);
        }

      }else{
      }
    }else{
      redirect('/login/');
    }
  }

  //checks a user login to see if they exist in the database
  public function login() {

    if(!$this->session_id){
      $config = array(
          array(
              'field' => 'username',
              'label' => 'Username',
              'rules' => 'trim|required|xss_clean'
          ),
          array(
              'field'=>'login_password',
              'label'=>'Password',
              'rules'=>array('trim','required',array('user_callable', array($this->User, 'validUser')))
          )
      );
      $this->form_validation->set_rules($config);
      $this->form_validation->set_message('user_callable', 'Username or Password is not correct.');

      if ($this->form_validation->run() == FALSE) {
        $this->data['title'] = 'Login';
        $this->data['bodyClass'] = 'login';
        $this->layout = 'layouts/logged_out';
        $this->view = 'login';
      } else{
        $this->data['query'] = $this->User->login();
        if(count($this->data['query']) > 0 ){
          $theuser = $this->data['query'][0];
          $this->session->set_userdata(array(
            'username'=>$theuser->username,
            'id'=>$theuser->id,
            'time'=> time()
          ));
          redirect('/');
        }else{
          return false;
        }
      }
    }else{
      redirect('/');
    }
  }

  //Logout a user
  public function logout() {
    $id = $this->session->userdata('id');
    $logged_out = $this->User->logout($id);
    if($logged_out){
      $this->session->sess_destroy();
      redirect('/');
    }else{
      redirect('/');
    }
  }

     //Sign up page
  public function signup(){

    $id = $this->User->from_form()->insert();
    if($id === FALSE)
    {
      $this->data['title'] = 'Signup';
      $this->data['bodyClass'] = 'signup';
      $this->layout = 'layouts/logged_out';
      $this->view = 'signup';
    }
    else
    {
      $stat_insert = $this->Stat->insert(array('user_id'=>$id));
      $this->data['title'] = 'Login';
      $this->data['bodyClass'] = 'login';
      $this->layout = 'layouts/logged_out';
      $this->view = 'login';
    }
  }//end signup

  //Get list of logged in Users
  public function getUserConnections(){
    $data = $this->User->getUserConnections($_SESSION['id']);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function connect($id){
    $type = $this->input->post('type');
    $data = $this->User->connect($_SESSION['id'], $id, $type);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function getConnections($id){
    $data = $this->User->getConnections($_SESSION['id'], $id);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }
}
?>