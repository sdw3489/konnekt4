<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'core/MY_REST_Controller.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Chats extends MY_REST_Controller {

    protected $models = array('Chat');

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        // $this->methods['index_get']['limit'] = 500; // 500 requests per hour per index/key
        // $this->methods['index_post']['limit'] = 100; // 100 requests per hour per index/key
        // $this->methods['index_delete']['limit'] = 50; // 50 requests per hour per index/key
    }

    public function index_get()
    {
        // games from a data store e.g. database
        $id = $this->get('id');
        $results = $this->Chat->with_user('fields: username')->get_all();
        $this->get_response($id, $results);
    }

    public function index_post()
    {
        $data = array(
            'user_id' => $this->session_id,
            'message' => $this->post('message')
        );
        $this->Chat->insert($data);
        $results = $this->_get_chat();

        $this->set_response($results, REST_Controller::HTTP_OK); // CREATED (200) being the HTTP response code
    }

    public function index_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        // $this->some_model->delete_something($id);
        $message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];

        $this->set_response($message, REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function latest_get(){
         // games from a data store e.g. database
        $id = $this->get('id');
        $results = $this->_get_chat();

        // Check if the games data store contains games (in case the database result returns NULL)
        if ($results)
        {
            // Set the response and exit
            $this->response($results, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            // Set the response and exit
            $this->response([
                'status' => FALSE,
                'message' => 'No Records were found'
            ], REST_Controller::HTTP_OK); // NOT_FOUND (404) being the HTTP response code
        }

    }

    public function time_get(){

        $results = array(
            'CI now()' => date('Y-m-d H:i:s e', now()),
            'time()'=> date('Y-m-d H:i:s e', time()),
            '$_SESSION'=> date('Y-m-d H:i:s e', $_SESSION['time']),
            'get_chats'=> date('Y-m-d H:i:s',local_to_gmt($_SESSION['time'])),
            'timezone' => date_default_timezone_get()
        );
        // Check if the games data store contains games (in case the database result returns NULL)
        if ($results)
        {
            // Set the response and exit
            $this->response($results, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            // Set the response and exit
            $this->response([
                'status' => FALSE,
                'message' => 'No Records were found'
            ], REST_Controller::HTTP_OK); // NOT_FOUND (404) being the HTTP response code
        }
    }

    private function _get_chat(){
        return $this->Chat->with_user('fields: username')
                    ->where('created_at >=', date('Y-m-d H:i:s',local_to_gmt($_SESSION['time'])))
                    ->order_by('created_at', 'ASC')
                    ->get_all();
    }

}
