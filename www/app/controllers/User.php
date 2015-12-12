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
                redirect('/');
        }else{
            redirect('/login/');
        }
    }

    public function view($id){
        if($this->session_id){
            $this->set_page_title('Profile');
            $this->set_body_class('profile');
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
                    $this->set_page_title('Edit Profile');
                    $this->set_body_class('profile');
                    $this->data['id'] = $this->session_id;
                    $this->data['notifications'] = $this->User->getNotifications($id);
                    $this->data['user'] = $this->User->get($id);
                    $this->view = 'profile/edit';
                }else{
                    redirect('/user/'.$id);
                }
            }else{
                redirect('/user/'.$id);
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
                $this->set_page_title('Login');
                $this->set_body_class('login');
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
        if($id === FALSE) {
            $this->set_page_title('Signup');
            $this->set_body_class('signup');
            $this->layout = 'layouts/logged_out';
            $this->view = 'signup';
        }
        else {
            $stat_insert = $this->Stat->insert(array('user_id'=>$id));
            $this->set_page_title('Login');
            $this->set_body_class('login');
            $this->layout = 'layouts/logged_out';
            $this->view = 'login';
        }
    }//end signup

}
?>