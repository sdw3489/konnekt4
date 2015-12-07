<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/core/MY_REST_controller.php';

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
class Games extends MY_REST_Controller {

    protected $models = array('Game');

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
        $results = $this->Game->get_all();
        $this->get_response($id, $results);
    }

    public function index_post()
    {
        // $this->some_model->update_user( ... );
        $message = [
            'id' => 100, // Automatically generated by the model
            'name' => $this->post('name'),
            'email' => $this->post('email'),
            'message' => 'Added a resource'
        ];

        $this->set_response($message, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
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

    //get a list of the game challenges
    public function challenges_get()
    {
        $results = $this->Game->getChallenges($this->session_id);
        $this->get_response(NULL, $results);
    }

    // Create New Game
    public function new_post()
    {
        $id = $this->post('id');
        $results = $this->Game->newGame($this->session_id, $id);

        $message = [
            'id' => $results, // Automatically generated by the model
            'message' => 'Created a Game'
        ];

        $this->set_response($message, REST_Controller::HTTP_CREATED);
    }

    // Get the last move played
    public function last_move_get($id)
    {

    }

    // Update the last move played
    public function last_move_post($id)
    {

    }

    // Get the entire board state
    public function board_get($id)
    {

    }

    // Update the entire board state
    public function board_post($id)
    {

    }

    // Get whose turn it is
    public function turn_get()
    {

    }

    // Update whose turn it is
    public function turn_post()
    {

    }

    // Get the game players
    public function players_get()
    {

    }

    // End game
    public function end_post()
    {

    }

}
