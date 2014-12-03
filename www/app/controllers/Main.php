<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Main extends CI_Controller {

	private $session_id;

	public function __construct(){
		parent::__construct();
		$this->load->model('user_model', 'User', TRUE);
		$this->load->driver('session');
		$this->session_id = $this->session->userdata('id');
	}

	public function index()	{
		if($this->session_id){
			$this->load->model('user_model', 'User', TRUE);
			$data['title'] = 'Dashboard';
			$data['bodyClass'] = 'dashboard';
			$data['stats'] = $this->User->getStats($this->session_id);
			$data['notifications'] = $this->User->getNotifications($_SESSION['id']);
			$this->load->view('global/head', $data);
			$this->load->view('global/nav', $data);
			$this->load->view('dashboard', $data);
			$this->load->view('global/footer', $data);
		}else{
			header("Location:/login/");
		}
	}
}

?>