<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

  private $model;

  public function __construct(){
    parent::__construct();
    $this->load->model('user_model', 'User', TRUE);
    $this->load->driver('session');
    $this->session_id = $this->session->userdata('id');
  }

  public function index(){
    if($this->session_id){
      $data['title'] = 'Users';
      $data['bodyClass'] = 'users';
      $data['users'] = $this->User->users();
      $data['usersJSON'] = json_encode($data['users'], JSON_NUMERIC_CHECK);
      $data['id'] = $this->session_id;
      $data['notifications'] = $this->User->getNotifications($_SESSION['id']);
      $this->load->view('global/head', $data);
      $this->load->view('global/nav', $data);
      $this->load->view('users', $data);
      $this->load->view('global/footer', $data);
    }else{
      header("Location:/login/");
    }
  }

  public function profile($id){
    if($this->session_id){
      $data['title'] = 'Profile';
      $data['bodyClass'] = 'profile';
      $data['id'] = $this->session_id;
      $data['notifications'] = $this->User->getNotifications($id);
      $data['user'] = $this->User->getUser($id);
      $this->load->view('global/head', $data);
      $this->load->view('global/nav', $data);
      $this->load->view('profile/main', $data);
      $this->load->view('global/footer', $data);
    }else{
      header("Location:/login/");
    }
  }

  public function edit($id){
    if($this->session_id){
      if($this->session_id == $id){
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        /*
        $this->form_validation->set_rules(
         'username', 'Username', 'trim|required|min_length[3]|max_length[12]|xss_clean',
            array(
                    'required'      => 'You have not provided a %s.'
            ));
        */
        $this->form_validation->set_rules('email', 'Email', 'valid_email');
        $this->form_validation->set_rules('password', 'Password', 'trim|min_length[3]');
        if($this->input->post('password')){
          $this->form_validation->set_rules('confirm_password', 'Password Confirmation', 'required|trim|matches[password]');
        }
        if ($this->form_validation->run() == TRUE) {
          $data['query'] = $this->User->update($id);
        }
        $data['title'] = 'Edit Profile';
        $data['bodyClass'] = 'profile';
        $data['id'] = $this->session_id;
        $data['notifications'] = $this->User->getNotifications($id);
        $data['user'] = $this->User->getUser($id);
        $this->load->view('global/head', $data);
        $this->load->view('global/nav', $data);
        $this->load->view('profile/edit', $data);
        $this->load->view('global/footer', $data);

      }else{
        header("Location:/");
      }
    }else{
      header("Location:/login/");
    }
  }

  //checks a user login to see if they exist in the database
  public function login() {
    $this->load->helper(array('form', 'url'));
    $this->load->library('form_validation');
    $this->form_validation->set_rules('username', 'Username', array(
      'trim',
      'required',
      'xss_clean'
    ));
    $this->form_validation->set_rules('login_password', 'Password', array(
      'trim',
      'required',
      array('user_callable', array($this->User, 'validUser'))
    ));

    $this->form_validation->set_message('user_callable', 'Username or Password is not correct.');

    if ($this->form_validation->run() == FALSE) {
      $data['title'] = 'Login';
      $data['bodyClass'] = 'login';
      $this->load->view('global/head', $data);
      $this->load->view('login', $data);
      $this->load->view('global/footer', $data);

    } else{
      $data['query'] = $this->User->login();
      if(count($data['query']) > 0 ){
        $theuser = $data['query'][0];
        $this->session->set_userdata(array(
          'username'=>$theuser->username,
          'id'=>$theuser->id,
          'time'=> time()
        ));
        header("Location:/");
      }else{
        return false;
      }
    }
  }

  //Logout a user
  public function logout() {
    $id = $this->session->userdata('id');
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
     'username', 'Username', 'trim|required|min_length[3]|max_length[12]|is_unique[user.username]|xss_clean',
        array(
                'required'      => 'You have not provided a %s.',
                'is_unique'     => 'This %s already exists.'
        ));
    $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email|xss_clean');
    $this->form_validation->set_rules('first_name', 'First Name', 'trim|xss_clean');
    $this->form_validation->set_rules('last_name', 'Last Name', 'trim|xss_clean');
    $this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[3]|xss_clean');
    $this->form_validation->set_rules('confirm_password', 'Password Confirmation', 'required|trim|matches[password]|xss_clean',
      array(
        'matches'=>'Passwords do not match.'
        ));

    if ($this->form_validation->run() == FALSE) {
      $data['title'] = 'Signup';
      $data['bodyClass'] = 'signup';
      $this->load->view('global/head', $data);
      $this->load->view('signup', $data);
      $this->load->view('global/footer', $data);
    } else{
      $data['query'] = $this->User->register();
      $data['title'] = 'Login';
      $data['bodyClass'] = 'login';
      $this->load->view('global/head', $data);
      $this->load->view('login', $data);
      $this->load->view('global/footer', $data);
    }
  }//end register

  //Get list of logged in Users
  public function getUserConnections(){
    $data = $this->User->getUserConnections($_SESSION['id']);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }

  public function getUserInfo($id){
    $data = $this->User->getUserInfo($id);
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

  public function getNotifications(){
    $data['notifications'] = $this->User->getNotifications($_SESSION['id']);
    echo json_encode($data, JSON_NUMERIC_CHECK);
  }
}
?>