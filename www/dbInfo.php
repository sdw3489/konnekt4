<?php

/*
 *---------------------------------------------------------------
 * APPLICATION ENVIRONMENT
 *---------------------------------------------------------------
 *
 * You can load different configurations depending on your
 * current environment. Setting the environment also influences
 * things like logging and error reporting.
 *
 * This can be set to anything, but default usage is:
 *
 *     development
 *     testing
 *     production
 *
 * NOTE: If you change these, also change the error_reporting() code below
 *
 */


$host = $_SERVER['HTTP_HOST'];
//check if user is either on local machine or using MACHINE_NAME to view site

switch (getenv('ENV')) {
  case 'dev':
    define('ENVIRONMENT', 'development');
    // db env settings
    define("DB_SERVER", "localhost");
    define("DB_USER", "root");
    define("DB_PASS", "");
    define("DB_NAME", "sethwhi1_konnekt4");
    break;

  default:
    define('ENVIRONMENT', 'production');
    // db env settings
    define('DBNAME', 'sethwhi1_konnekt4');
    define('DBUSER', 'sethwhi1_admin');
    define('DBPASS', 'Carr1349');
    define('DBHOST', 'localhost');
    break;

}

?>