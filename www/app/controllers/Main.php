<?php

class Main extends CI_Controller {

	private $session_id;

	public function __construct(){
		parent::__construct();
		$this->load->driver('session');
		$this->session_id = $this->session->userdata('user_Id');
	}

	public function index()	{
		if($this->session_id){
			$data['title'] = 'Foyer';
			$this->load->view('global/head', $data);
			$this->load->view('global/nav', $data);
			$this->load->view('foyer', $data);
		}else{
			$data['title'] = 'Login';
			$this->load->view('global/head', $data);
			$this->load->view('login', $data);
		}
	}
}

?>