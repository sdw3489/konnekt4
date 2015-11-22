<?php
/**
 * A base controller for CodeIgniter with view autoloading, layout support,
 * model loading, helper loading, asides/partials and per-controller 404
 *
 * @link http://github.com/jamierumbelow/codeigniter-base-controller
 * @copyright Copyright (c) 2012, Jamie Rumbelow <http://jamierumbelow.net>
 */

class MY_Controller extends CI_Controller
{

    /* --------------------------------------------------------------
     * VARIABLES
     * ------------------------------------------------------------ */

    /**
     * The current request's view. Automatically guessed
     * from the name of the controller and action
     */
    protected $view = '';

    /**
     * An array of variables to be passed through to the
     * view, layout and any asides
     */
    protected $data = array();

    /**
     * The name of the layout to wrap around the view.
     */
    protected $layout;

    /**
     * An arbitrary list of asides/partials to be loaded into
     * the layout. The key is the declared name, the value the file
     */
    protected $asides = array();

    /**
     * A list of models to be autoloaded
     */
    protected $models = array();

    /**
     * A formatting string for the model autoloading feature.
     * The percent symbol (%) will be replaced with the model name.
     */
    protected $model_string = '%_model';

    /**
     * A list of helpers to be autoloaded
     */
    protected $helpers = array();

    /* --------------------------------------------------------------
     * GENERIC METHODS
     * ------------------------------------------------------------ */

    /**
     * Initialise the controller, tie into the CodeIgniter superobject
     * and try to autoload the models and helpers
     */
    public function __construct()
    {
        parent::__construct();

        $this->_load_models();
        $this->_load_helpers();
    }

    /* --------------------------------------------------------------
     * VIEW RENDERING
     * ------------------------------------------------------------ */

    /**
     * Override CodeIgniter's despatch mechanism and route the request
     * through to the appropriate action. Support custom 404 methods and
     * autoload the view into the layout.
     */
    public function _remap($method)
    {
        if (method_exists($this, $method))
        {
            call_user_func_array(array($this, $method), array_slice($this->uri->rsegments, 2));
        }
        else
        {
            if (method_exists($this, '_404'))
            {
                call_user_func_array(array($this, '_404'), array($method));
            }
            else
            {
                show_404(strtolower(get_class($this)).'/'.$method);
            }
        }

        $this->_load_view();
    }

    /**
     * Automatically load the view, allowing the developer to override if
     * he or she wishes, otherwise being conventional.
     */
    protected function _load_view()
    {
        // If $this->view == FALSE, we don't want to load anything
        if ($this->view !== FALSE)
        {
            // If $this->view isn't empty, load it. If it isn't, try and guess based on the controller and action name
            $view = (!empty($this->view)) ? $this->view : $this->router->directory . $this->router->class . '/' . $this->router->method;

            // Load the view into $yield
            $data['yield'] = $this->load->view($view, $this->data, TRUE);

            // Do we have any asides? Load them.
            if (!empty($this->asides))
            {
                foreach ($this->asides as $name => $file)
                {
                    $data['yield_'.$name] = $this->load->view($file, $this->data, TRUE);
                }
            }

            // Load in our existing data with the asides and view
            $data = array_merge($this->data, $data);
            $layout = FALSE;

            // If we didn't specify the layout, try to guess it
            if (!isset($this->layout))
            {
                if (file_exists(APPPATH . 'views/layouts/' . $this->router->class . '.php'))
                {
                    $layout = 'layouts/' . $this->router->class;
                }
                else
                {
                    $layout = 'layouts/application';
                }
            }

            // If we did, use it
            else if ($this->layout !== FALSE)
            {
                $layout = $this->layout;
            }

            // If $layout is FALSE, we're not interested in loading a layout, so output the view directly
            if ($layout == FALSE)
            {
                $this->output->set_output($data['yield']);
            }

            // Otherwise? Load away :)
            else
            {
                $this->load->view($layout, $data);
            }
        }
    }

    /* --------------------------------------------------------------
     * MODEL LOADING
     * ------------------------------------------------------------ */

    /**
     * Load models based on the $this->models array
     */
    private function _load_models()
    {
        foreach ($this->models as $model)
        {
            $this->load->model($this->_model_name($model), $model);
        }
    }

    /**
     * Returns the loadable model name based on
     * the model formatting string
     */
    protected function _model_name($model)
    {
        return str_replace('%', $model, $this->model_string);
    }

    /* --------------------------------------------------------------
     * HELPER LOADING
     * ------------------------------------------------------------ */

    /**
     * Load helpers based on the $this->helpers array
     */
    private function _load_helpers()
    {
        foreach ($this->helpers as $helper)
        {
            $this->load->helper($helper);
        }
    }

    /**
     * Set page title.
     *
     * @access protected
     * @param  string $page_title
     */
    protected function set_page_title($page_title)
    {
        $this->load->vars(array('page_title' => $page_title));
    }

    /**
     * Set meta description.
     *
     * @access protected
     * @param  string $meta_description
     */
    protected function set_meta_description($meta_description)
    {
        $this->load->vars(array('meta_description' => $meta_description));
    }

    /**
     * Load css styles.
     *
     * @access protected
     * @param  array $css
     */
    protected function load_css(array $css)
    {
        // If globals exist - combine the globals with local
        if ($og_css = $this->load->get_var('site_css')) {
            // merge
            $css = array_merge($og_css, $css);
            // get rid of duplicates
            $css = array_unique($css);
        }

        $this->load->vars('site_css', $css);
    }

    /**
     * Load javascript files.
     *
     * @access protected
     * @param  array $js
     */
    protected function load_js(array $js)
    {
        // If globals exist - combine the globals with local
        if ($og_js = $this->load->get_var('site_js')) {
            // merge
            $js = array_merge($og_js, $js);
            // get rid of duplicates
            $js = array_unique($js);
        }

        $this->load->vars('site_js', $js);
    }

    /**
     * Return json data.
     *
     * @access protected
     * @param  array $data
     * @link http://ellislab.com/codeigniter/user-guide/libraries/output.html
     *
     */
    protected function return_json($data)
    {
        // destroy layout
        unset($this->layout);

        // Set content type and output
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }
}