<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Users extends MY_Controller {

    protected $models = array('User', 'Stat');
    protected $helpers = array('url');

    public function __construct(){
        parent::__construct();
        $this->load->driver('session');
        $this->load->library('form_validation');
        $this->session_id = $this->session->userdata('id');
    }

    public function index(){
        if($this->session_id){
            $this->set_page_title('Users');
            $this->set_body_class('users');
            $this->data['users'] = $this->User->users();
            $this->data['usersJSON'] = json_encode($this->data['users'], JSON_NUMERIC_CHECK);
            $this->data['id'] = $this->session_id;
            $this->data['notifications'] = $this->User->getNotifications($_SESSION['id']);
            $this->view = 'users';
        }else{
            redirect('/login/');
        }
    }
}
?>