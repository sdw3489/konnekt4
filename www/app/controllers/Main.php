<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Main extends MY_Controller {

	protected $models = array('User', 'Stat');
	protected $helpers = array('url');
	private $session_id;

	public function __construct(){
		parent::__construct();
		$this->load->driver('session');
		$this->session_id = $this->session->userdata('id');
	}

	public function index()	{
		if($this->session_id){
			$this->data['title'] = 'Dashboard';
			$this->data['bodyClass'] = 'dashboard';
			$this->data['id'] = $this->session_id;
			$this->data['stats'] = $this->Stat->get($this->session_id);
			$this->data['notifications'] = $this->User->getNotifications($_SESSION['id']);
			$this->view ='dashboard';
		}else{
			redirect("/login/");
		}
	}
}

?>